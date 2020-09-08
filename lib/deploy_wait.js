const colors = require("colors");
const pad = require("pad");
const values = require("./values");
const Table = require("cli-table");
const cliProgress = require("cli-progress");

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

//Progress bar
function loadingProgress(status) {
  console.log("\nDeploying " + status.cyan);
  console.log(
    "Default values applied to this deployment are [os=ubuntu || release=18.04 || kernel=no].\n"
  );
  console.log("Process running:");
  task(() => {
    task(() => {
      task(() => {
        task(() => {
          task(() => {
            task(() => {
              task(() => {
                task(() => {
                  task(() => {
                    console.log("Deployment complete!");

                    if (status == "known-viper.maas") {
                      machineTable.push(values.deployMachine[0]);
                      console.log(machineTable.toString());
                    }
                    if (status == "legal-finch.maas") {
                      machineTable.push(values.deployMachine[1]);
                      console.log(machineTable.toString());
                    }
                    if (status == "still-foal.maas") {
                      machineTable.push(values.deployMachine[2]);
                      console.log(machineTable.toString());
                    }
                    if (status == "cape-foal.maas") {
                      machineTable.push(values.deployMachine[3]);
                      console.log(machineTable.toString());
                    }
                  }, "9.Deployed");
                }, "8.Reboot");
              }, "7.Configuring bootloader");
            }, "6.Confuguring network");
          }, "5.Installing OS");
        }, "4.Fomatting disk");
      }, "3.Start installation");
    }, "2.Downloading ephemeral environment");
  }, "1.Initial booting");
}

function task(onComplete, stepName) {
  // create new progress bar
  const b1 = new cliProgress.Bar(
    {
      format:
        pad(stepName, values.longest_pad) +
        "|" +
        colors.cyan("{bar}") +
        "| Time Elapse: {speed}",
    },
    cliProgress.Presets.rect
  );

  // initialize the bar -  defining payload token "speed" with the default value "N/A"
  b1.start(200, 0, {
    speed: "N/A",
  });

  // the bar value - will be linear incremented
  let value = 0;

  const speedData = [];

  // 20ms update rate
  let timer = setInterval(function () {
    // increment value
    value++;

    // example speed data
    speedData.push(Math.random() * 2 + 5);
    const currentSpeedData = speedData.splice(-10);

    // update the bar value
    b1.update(value, {
      speed:
        (
          currentSpeedData.reduce(function (a, b) {
            return a + b;
          }, 0) / currentSpeedData.length
        ).toFixed(2) + "s",
    });

    // set limit
    if (value >= b1.getTotal()) {
      // stop timer
      clearInterval(timer);

      b1.stop();

      // run complete callback
      onComplete.apply(this);
    }
  }, 20);
}

module.exports = function (machine_name) {
  loadingProgress(machine_name);
};
