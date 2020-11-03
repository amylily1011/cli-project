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
    "FQDN".cyan.bold,
    "POWER".cyan.bold,
    "TYPE".cyan.bold,
    "STATUS".cyan.bold,
    // "Owner",
    // "Arch",
    "CORES".cyan.bold,
    "RAM".cyan.bold,
    // "Pool",
    // "Zone",
    // "Fabric",
    "IP ADDRESS".cyan.bold,
  ],
  chars: {'top':'', 'top-mid': '' , 'top-left': '' , 'top-right': ''
  , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
  , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
  , 'right': '' , 'right-mid': '' , 'middle': ' ' },
  // style: {'padding-left': 0, 'padding-right': 0 }
});


module.exports = function (Hostname) {
  //console.log("primary profile: " + "bolla-local".cyan);
  const didYouMean = [
    {
      type: "search-list",
      name: "hostName",
      message: "Did you mean:",
      choices: machineNames,
    },
  ];

  if (
    (Hostname == "known-viper") |
    (Hostname == "known-viper.maas") |
    ((Hostname == "legal-finch") | (Hostname == "legal-finch.maas")) |
    ((Hostname == "still-foal") | (Hostname == "still-foal.maas")) |
    ((Hostname == "cape-foal") | (Hostname == "cape-foal.maas"))
  ) {
    if (Hostname == "known-viper") {
      machineTable.push(machinesData[0]);
      console.log(machineTable.toString());
    }
    if (Hostname == "legal-finch") {
      machineTable.push(machinesData[1]);
      console.log(machineTable.toString());
    }
    if (Hostname == "still-foal") {
      machineTable.push(machinesData[2]);
      console.log(machineTable.toString());
    }
    if (Hostname == "cape-foal") {
      machineTable.push(machinesData[3]);
      console.log(machineTable.toString());
    }
  } else {
    console.log("Error: ".red + Hostname.bold + " does not exist.\n");
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
