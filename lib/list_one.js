const colors = require("colors");
const Spinner = require("cli-spinner").Spinner;
const { machinesData, machineNames } = require("./values");
const Table = require("cli-table");
const inquirer = require("inquirer");
const pad = require("pad");

//register search list plugin
inquirer.registerPrompt("search-list", require("inquirer-search-list"));

const machineTable = new Table({
  head: [
    "FQDN",
    "Power",
    "Status",
    // "Owner",
    // "Arch",
    "Cores",
    "RAM",
    // "Pool",
    // "Zone",
    // "Fabric",
    "IP address",
  ],
  colWidths: [],
});

module.exports = function (Hostname) {
  console.log("");
  console.log("primary profile: " + "bolla-local".cyan);
  const didYouMean = [
    {
      type: "search-list",
      name: "hostName",
      message: "Did you mean:",
      choices: machineNames,
    },
  ];

  if (
    (Hostname == "known-viper*") |
    (Hostname == "legal-finch*") |
    (Hostname == "still-foal*") |
    (Hostname == "cape-foal*")
  ) {
    if (Hostname == "known-viper*") {
      machineTable.push(machinesData[0]);
      console.log(machineTable.toString());
    }
    if (Hostname == "legal-finch*") {
      machineTable.push(machinesData[1]);
      console.log(machineTable.toString());
    }
    if (Hostname == "still-foal*") {
      machineTable.push(machinesData[2]);
      console.log(machineTable.toString());
    }
    if (Hostname == "cape-foal*") {
      machineTable.push(machinesData[3]);
      console.log(machineTable.toString());
    }
  } else {
    console.log("Error:".red + " This machine does not exist.\n");
    inquirer.prompt(didYouMean).then((answer) => {
      console.log(pad(colors.gray("Hostname:"), 25), answer.hostName);

      if (answer.hostName == "known-viper.maas") {
        machineTable.push(machinesData[0]);
        console.log(machineTable.toString());
      }
      if (answer.hostName == "legal-finch.maas") {
        machineTable.push(machinesData[1]);
        console.log(machineTable.toString());
      }
      if (answer.hostName == "still-foal.maas") {
        machineTable.push(machinesData[2]);
        console.log(machineTable.toString());
      }
      if (answer.hostName == "cape-foal.maas") {
        machineTable.push(machinesData[3]);
        console.log(machineTable.toString());
      }
    });
  }
};
