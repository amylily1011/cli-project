const colors = require("colors");
const { machinesData } = require("./values");
const Table = require("cli-table");

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

machinesData.forEach((machine) => {
  machineTable.push(machine);
});

module.exports = function () {
  console.log(machineTable.toString());
};
