const colors = require("colors");
const { types, machines, machinesData } = require("./values");
const Table = require("cli-table");

const machineTable = new Table({
  head: [
    "Hostname",
    "Power",
    "Status",
    "Owner",
    "Arch",
    "#CPUs",
    "RAM",
    "Pool",
    "Zone",
    "Fabric",
    "Subnet",
  ],
  colWidths: [],
});

machinesData.forEach((machine) => {
  machineTable.push(machine);
});

module.exports = function () {
  //   console.log("COFFEE MENU");
  //   console.log("------------------");

  // list on separate lines
  //   types.forEach((type) => {
  //     console.log(
  //       "%s %s",
  //       colors.bold(type.name),
  //       colors.grey("/ " + type.price)
  //     );
  //   });

  // console.table(machines);

  console.log(machineTable.toString());
};
