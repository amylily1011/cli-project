const colors = require("colors");
const Spinner = require("cli-spinner").Spinner;
const { commissionMachine, longest_pad } = require("./values");
const Table = require("cli-table");
const cliProgress = require("cli-progress");
const pad = require("pad");
const { options } = require("cli-table/lib/utils");

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

function task(Hostname) {
  const files = {
    "20-maas-01-install-lldpd           ": 187,
    "20-maas-02-dhcp-unconfigured-ifaces": 889,
    "40-maas-01-network-interfaces      ": 5342,
    "50-maas-01-commissioning           ": 1424,
    "echo                               ": 513,
    "maas-capture-lldpd                 ": 4123,
    "maas-gett-fruid-api-data           ": 187,
    "maas-kernel-cmdline                ": 589,
    "maas-list-modaliases               ": 5342,
    "maas-lshw                          ": 424,
    "maas-serial-ports                  ": 513,
    "maas-support-info                  ": 4123,
  };
  const bars = [];

  // create new container
  const multibar = new cliProgress.MultiBar(
    {
      format:
        pad("   {file}", 15) +
        "|" +
        colors.cyan("{bar}") +
        "| Time elapsed: {speed}",
      hideCursor: true,
      stopOnComplete: true,
    },
    cliProgress.Presets.rect
  );
  console.log(
    "url: " + "http://bolla.internal:5240/MAAS/l/machine/dpg7ap".underline
  );
  console.log("Running commissioning scripts on " + Hostname.cyan + "...");

  // add bars
  for (const filename in files) {
    const size = files[filename];

    bars.push(multibar.create(size, 0, { file: filename }));
  }
  let value = 0;
  const speedData = [];
  const timer = setInterval(function () {
    // increment
    value++;

    // example speed data
    speedData.push(Math.random() * 2 + 5);
    const primarySpeedData = speedData.splice(-10);

    for (let i = 0; i < bars.length; i++) {
      const bar = bars[i];
      // download complete ?

      if (bar.value < bar.total) {
        bar.update(i == 5 ? 250 : value, {
          speed:
            (
              primarySpeedData.reduce((a, b) => {
                if (i == 5) {
                  setTimeout(() => {
                    bar.stop();
                  }, 3000);
                  return a + b;
                } else return a + b;
              }, 0) / primarySpeedData.length
            ).toFixed(2) + "s",
        });
      }
    }

    // progress bar running ?
    // check "isActive" property in case you've enabled "stopOnComplete" !
    if (multibar.isActive === false) {
      clearInterval(timer);

      multibar.stop();
      console.log("Error: ".red, "Commissioning Fail.");
      console.log(
        pad("[ERROR]".red, 10),
        "Fail to run " + "maas-capture-lldpd".bold
      );
      console.log(
        pad("[WARN]".yellow, 10),
        "Fail to query node's BMC-(bolla-local)-" +
          "No rack controllers can be access to BMC of node " +
          Hostname.bold
      );
      if (Hostname) {
        if (Hostname == "known-viper.maas") {
          machineTable.push(commissionMachine[0]);
          console.log(machineTable.toString());
        }
        if (Hostname == "legal-finch.maas") {
          machineTable.push(commissionMachine[1]);
        }
        if (Hostname == "still-foal.maas") {
          machineTable.push(commissionMachine[2]);
        }
        if (Hostname == "cape-foal.maas") {
          machineTable.push(commissionMachine[3]);
          console.log(machineTable.toString());
        }
      } else console.log("Error:".red + " This machine does not exist.\n");

      console.log("\nSuggestions:".bold);
      console.log("Check out log files for more information on this machine.");
      console.log("Try: " + "maas log [MACHINE_NAME]".cyan);
      console.log("\nCheck out event logs  on this machine.");
      console.log("Try: " + "maas event [MACHINE_NAME]".cyan);
      console.log(
        "\nMore information: " +
          "https://maas.io/docs/commissioning-and-hardware-testing-scripts"
            .underline
      );
    }
  }, 3);
}

module.exports = function (Hostname) {
  console.log("primary profile: " + "bolla-local".cyan);
  task(Hostname);
};
