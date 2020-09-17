#!/usr/bin/env node
const program = require("commander");
const pad = require("pad");
const colors = require("colors");

const { machines, commands } = require("../lib/values");

const standard_pad = 15;
const long_pad = 20;
//import function to deploy
const deploy = require("../lib/deploy");
const deploy_default = require("../lib/deploy_default");
const deploy_wait = require("../lib/deploy_wait");
const deploy_error = require("../lib/deploy_error");

//import help
const help = require("../lib/help");

// import function to list
const list = require("../lib/list");
// import function to commission
const commission = require("../lib/commission");
const commission_default = require("../lib/commission_default");

//to add machine as a subcommand
const machine = program.command("machine");

//import list one machine
const listOne = require("../lib/list_one");

//import object
const object = require("../lib/object");

const { green } = require("colors/safe");
const list_help = require("../lib/list_help");

//command: maas machine list
machine
  .command("list")
  .alias("ls")
  .option(
    "--format <type>",
    " Display the output in other format - json, csv, yaml, value."
  )
  .description(
    "List all machines or a specific machine in a table format. \nYou can either parse an argument to define which machine(s)\nto list such as machine name,status, machine id, or other\nattributes using filter. You may also specify which columns \nyou would like to list on the table. "
  )
  .action(function (cmdObj) {
    cmdObj.format ? console.log(JSON.stringify(machines)) : list();
  });

//command: maas list [--format] <json>
program
  .command("list [MACHINE_NAME]")
  .alias("ls")
  .option(
    "--format <type>",
    "Display the output in other format ( json | csv | yaml | value )."
  )
  .option(
    "--status <status>",
    "There are 6 statuses - fail, new, ready, allocated, deployed, broken."
  )
  .option(
    "-c, --column <attribute>",
    pad(
      25,
      "Use this flag to specify any columns you want to display in the output, \nit will override the default columns."
    )
  )
  .description(
    "List all machines or a specific machine in a table format. You can either parse an argument\nto define which machine(s) to list such as machine name,status, machine id, or other attributes" +
      "\nusing filter. You may also specify which columns you would like to list on the table."
  )
  .on("--help", () => {
    list_help();
  })
  .action(function (MACHINE_NAME, cmdObj) {
    MACHINE_NAME
      ? listOne(MACHINE_NAME)
      : cmdObj.format
      ? console.log(JSON.stringify(machines))
      : list();
  });

// command: maas deploy
program
  .command("deploy [$MACHINE_NAME]")
  .description(
    "Deploy multiple machines using the status flag or a specific machine." +
      "\nWhen other arguments are not specified, MAAS will applied default values\nto the deployment [OS=ubuntu] [release=18.04] [kernel=no]." +
      "\n\nFor more information visit: " +
      "https://maas.io/docs/common-cli-tasks#heading--deploy-a-node".underline
  )
  .usage("[$MACHINE_NAME] | [options]")
  .option(
    "-i, --interactive",
    "Using interactive mode will help guide users through incomplete commands."
  )
  .option("-w, --wait", "Block the command prompt and show waiting state.")
  .option(
    "-s, --status <status>",
    "Deploy machine in the described status.[ allocated | ready ]"
  )
  .option("--filter", "Filter machine properties to deploy multiple machines.")
  .action(($MACHINE_NAME, cmdObj) => {
    if ($MACHINE_NAME) {
      cmdObj.interactive
        ? deploy($MACHINE_NAME)
        : cmdObj.wait
        ? deploy_wait($MACHINE_NAME)
        : deploy_default($MACHINE_NAME);
    }

    if (!$MACHINE_NAME) {
      $MACHINE_NAME = "2 " + cmdObj.status + " machines";
      cmdObj.interactive
        ? deploy($MACHINE_NAME)
        : cmdObj.wait
        ? cmdObj.status
          ? deploy_wait($MACHINE_NAME)
          : deploy_error()
        : cmdObj.status
        ? deploy_default($MACHINE_NAME)
        : deploy_error();
    }
  })
  .on("--help", () => {
    console.log("");
    console.log("Examples:");
    console.log(
      "To deploy a single machine by machine name.",
      pad("\nTry:" + " maas deploy <MACHINE_NAME>".cyan, 10)
    );
    console.log(
      "\nTo deploy all machines that are allocated.",
      pad("\nTry:" + " maas deploy -s allocated".cyan, 10)
    );
    console.log(
      "\nTo deploy multiple machines with status=allocated and CPU cores=4. Separate by comma.",
      pad("\nTry:" + " maas deploy --filter status=allocated,core=4 ".cyan, 10)
    );
    console.log("");
  });

// command: maas commission <MACHINE_NAME>
program
  .command("commission <MACHINE_NAME>")
  .description("Commission one machine by $MACHINE_NAME")
  .option("-w, --wait", "Block the command prompt and show waiting state.")
  .action((MACHINE_NAME, cmdObj) => {
    cmdObj.wait ? commission(MACHINE_NAME) : commission_default(MACHINE_NAME);
  });

// command: maas object
program.command("object list").action(() => {
  object();
});

// help command
program
  .usage("[MAAS object] [ACTION] [OPTIONS] [ARGUMENTS]")
  .version("2.9.1~alpha")
  .option("--no-color", "Disable coloring for the output.")
  .action(() => {
    help("2.9.1~alpha");
  });

program.program.parse(process.argv);
