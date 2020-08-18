#!/usr/bin/env node
const program = require("commander");
const pad = require("pad");
const colors = require("colors");

const { machines, commands } = require("../lib/values");

//import function to deploy
const deploy = require("../lib/deploy");

// import function to list
const list = require("../lib/list");
// import function to commission
const commission = require("../lib/commission");

//to add machine as a subcommand
const machine = program.command("machine");

//import list one machine
const listOne = require("../lib/list_one");

//command: maas machine list
machine
  .command("list")
  .alias("ls")
  .option("--format <type>")
  .action(function (cmdObj) {
    cmdObj.format ? console.log(JSON.stringify(machines)) : list();
  });

//command: maas list [--format] <json>
program
  .command("list [MACHINE_NAME]")
  .alias("ls")
  .option("--format <type>")
  .description("List all machines.")
  .action(function (MACHINE_NAME, cmdObj) {
    MACHINE_NAME
      ? listOne(MACHINE_NAME)
      : cmdObj.format
      ? console.log(JSON.stringify(machines))
      : list();
  });

// command: maas deploy
program
  .command("deploy <MACHINE_NAME | status>")
  .description(
    "Deploy all machines by status = [ allocated | ready]. You can deploy individual or multiple machines" +
      "\nby parsing the $MACHINE_NAME as argument or machine status as argument."
  )
  .usage("<$MACHINE_NAME or status = ready | allocated>".gray)
  .action((status) => {
    deploy(status);
  })
  .on("--help", () => {
    console.log("");
    console.log("Example: maas deploy status=ready\n");
    console.log(
      pad(colors.gray("[status = allocated | ready ]"), 20),
      "deploy all machines by status."
    );
    console.log("");
  });

// command: maas commission <MACHINE_NAME>
program
  .command("commission <MACHINE_NAME>")
  .description("Commission one machine by $MACHINE_NAME")
  .action((MACHINE_NAME) => {
    commission(MACHINE_NAME);
  });

// help command
program
  .usage("[MAAS object] [ACTION] [OPTIONS] [ARGUMENTS]".gray)
  .version("maas 2.9.1~alpha")
  .action(() => {
    console.log(
      "\nWelcome to MAAS CLI. MAAS CLI controls your virtual machines in MAAS."
    );
    console.log("MAAS version: maas 2.9.1~alpha".blue);
    console.log(
      "\nUsage:".gray +
        " maas [MAAS object] [ACTION] [OPTIONS] [ARGUMENTS]".gray
    );
    //Basic commands
    console.log("\nBasic commands: ");
    console.log(
      " list".green + "                          List all machines in MAAS."
    );
    console.log(
      " list".green +
        " [MACHINE_NAME]" +
        "           List a machine in MAAS with name [MACHINE_NAME]."
    );
    console.log(
      " create".gray + "                        Create a machine in MAAS."
    );
    console.log(
      " delete".gray +
        " [MACHINE_NAME]" +
        "         Delete a machine in MAAS with name [MACHINE_NAME]."
    );
    //Taking actions
    console.log("\nTaking action: ");
    console.log(
      " allocate" + " [MACHINE_NAME]" + "       Allocate a machine in MAAS."
    );

    console.log(
      " commission".green +
        " [MACHINE_NAME]" +
        "     Commission a machine in MAAS."
    );

    console.log(
      " deploy".green + " [MACHINE_NAME]" + "         Deploy a machine in MAAS."
    );

    console.log(
      " release".gray +
        " [MACHINE_NAME]" +
        "        Release a machine that is deployed or allocated in MAAS."
    );
    //Node management commands:
    console.log("\nNode management commands: ");
    console.log(
      " set-config-timeout".gray + "            Set deployment timeout."
    );
    console.log(
      " set-config-kernal".gray +
        "             Set a minimum kernel for all new and commissioned machines."
    );
    console.log(
      " disable-proxy".gray + "                 Disable proxying completely."
    );
    //Toubleshooting and debugging commands:
    console.log("\nTroubleshooting and debugging commands: ");
    console.log(
      " log".gray + " [MACHINE_NAME]" + "            Show machine logs."
    );

    //Options:
    console.log("\nOptions: ");
    console.log(" -h,--help" + "            Display help for command.");
    console.log(" -V,--version" + "         Output the version number.");
    console.log(
      " --format" +
        " <type>".gray +
        "      Display the output in other <type> format, such as json or yaml."
    );
    console.log("\n");
  });

program.program.parse(process.argv);
