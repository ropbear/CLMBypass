using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CLMB
{
    class Program
    {
        static void Main(string[] args)
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
