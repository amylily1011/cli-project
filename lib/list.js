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
