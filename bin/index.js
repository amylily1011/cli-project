#!/usr/bin/env node
const program = require("commander");
const pad = require("pad");
const colors = require("colors");

const { machines, commands } = require("../lib/values");

const standard_pad = 15;
const long_pad = 20;
//import function to deploy
const deploy = require("../lib/deploy");

//import help
const help = require("../lib/help");

// import function to list
const list = require("../lib/list");
// import function to commission
const commission = require("../lib/commission");

//to add machine as a subcommand
const machine = program.command("machine");

//import list one machine
const listOne = require("../lib/list_one");

//import object
const object = require("../lib/object");

const { green } = require("colors/safe");

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
  .command("list [MACHINE_NAME] | [id]")
  .alias("ls")
  .option(
    "--format <type>",
    "Display the output in other format ( json | csv | yaml | value ).",
    "table"
  )
  .option(
    "--status <status>",
    "There are 6 statuses - fail, new, ready, allocated, deployed, broken."
  )
  .option(
    "-c, --column <column names>",
    "Use this flag to specify any columns you want to display in the output, it will override the default columns."
  )
  .description(
    "List all machines or a specific machine in a table format. You can either parse an argument\nto define which machine(s) to list such as machine name,status, machine id, or other attributes\nusing filter. You may also specify which columns you would like to list on the table."
  )
  .on("--help", () => {
    console.log("\nExamples:".bold);
    console.log(
      "To list all machines with a ready status.\n" +
        " Try: " +
        "maas list --status ready".cyan
    );
    console.log(
      "\nCustomise columns headers in the list to show FQDN, status, core, \narchitecture, and pool.\n" +
        " Try: " +
        "maas list -c FQDN,status,core,arch,pool".cyan
    );
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
  .command("deploy <MACHINE_NAME> | <status>")
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

// command: maas object
program.command("object list").action(() => {
  object();
});

// help command
program
  .usage("[MAAS object] [ACTION] [OPTIONS] [ARGUMENTS]")
  .version("2.9.1~alpha")
  .action(() => {
    help("2.9.1~alpha");
  });

program.program.parse(process.argv);
