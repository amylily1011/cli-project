const colors = require("colors");
const { machinesData } = require("./values");
const Table = require("cli-table");

const machineTable = new Table({
  head: [
    "FQDN",
    "Power",
    "Type",
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
  console.log("primary profile: " + "bolla-local".cyan);
  console.log("url: " + "http://bolla.internal:5240/MAAS/r/machines".underline);
  console.log(machineTable.toString());
};
