const colors = require("colors");
const { machinesData, machineTable } = require("./values");
const Table = require("cli-table");

machinesData.forEach((machine) => {
  machineTable.push(machine);
});

module.exports = function () {
  // console.log("primary profile: " + "bolla-local".cyan);
  // console.log("url: " + "http://bolla.internal:5240/MAAS/r/machines".underline);
  console.log(machineTable.toString());
};
