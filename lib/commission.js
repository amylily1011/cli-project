const colors = require("colors");
const Spinner = require("cli-spinner").Spinner;
const { commissionMachine } = require("./values");
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

module.exports = function (Hostname) {
  console.log("primary profile: " + "bolla-local".cyan);
  const spinner = new Spinner(
    "Commissioning " + Hostname.green + ", this can take a while...%s"
  );
  spinner.setSpinnerString("|/-\\");
  console.log("\n");

  if (
    (Hostname == "known-viper.maas") |
    (Hostname == "legal-finch.maas") |
    (Hostname == "still-foal.maas") |
    (Hostname == "cape-foal.maas")
  ) {
    spinner.start();
    setTimeout(() => {
      spinner.stop();
      if (Hostname == "known-viper.maas") {
        console.log("\n" + "Success!".green);

        machineTable.push(commissionMachine[0]);
        console.log(machineTable.toString());
      }
      if (Hostname == "legal-finch.maas") {
        console.log("\n" + "Success!".green);

        machineTable.push(commissionMachine[1]);
        console.log(machineTable.toString());
      }
      if (Hostname == "still-foal.maas") {
        console.log("\n" + "Success!".green);

        machineTable.push(commissionMachine[2]);
        console.log(machineTable.toString());
      }
      if (Hostname == "cape-foal.maas") {
        console.log(
          "\n" +
            "Fail commission".red +
            " due to invalid commissioning script.\n"
        );

        machineTable.push(commissionMachine[3]);
        console.log(machineTable.toString());
      }
    }, 10000);
  } else console.log("Error:".red + " This machine does not exist.\n");
};
