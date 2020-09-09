const inquirer = require("inquirer");
const colors = require("colors");
const pad = require("pad");
const values = require("./values");
const Spinner = require("cli-spinner").Spinner;
const Table = require("cli-table");
const cliProgress = require("cli-progress");

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

const question1 = [
  {
    type: "search-list",
    name: "OS",
    message: "Choose your OS:",
    default: "Ubuntu",
    choices: values.OS,
  },
];

const question_centos = [
  {
    type: "list",
    name: "release",
    message: "Choose which release:",
    choices: values.centos_releases,
  },
];

const question_ubuntun = [
  {
    type: "search-list",
    name: "release",
    message: "Choose which release:",
    choices: values.ubuntu_releases,
  },
];

const kernel = [
  {
    type: "input",
    name: "kernel",
    message: "Input your kernel:",
    default: () => {
      return "No minimum kernel";
    },
    transformer: function (answer) {
      return answer;
    },
  },
];

const KVM = [
  {
    type: "confirm",
    name: "kvm_install",
    message: "Register as MAAS KVM host [default=No]:",
    default: false,
  },
];

const cloud_init = [
  {
    type: "input",
    name: "user_data",
    message: "Add a file path to customize cloud-init user data:",
    default: () => {
      return "Use default user-data";
    },
    transformer: (answer) => {
      return answer;
    },
  },
];

function loading(status) {
  const spinner = new Spinner(
    "Deploying".blue +
      " machine(s): " +
      status.blue +
      ", this can take a while...%s"
  );
  spinner.setSpinnerString("|/-\\");
  spinner.start();
  setTimeout(() => {
    spinner.stop();
    console.log(
      "\n" +
        "Error!".red +
        " Installation failed (refer to the installation log for more information).\n"
    );
  }, 10000);
}

//Progress bar
function loadingProgress(status) {
  console.log("Deploying " + status.cyan);
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
  inquirer.prompt(question1).then((answer) => {
    // console.log(pad(colors.gray("\nOS: "), 15), answer.OS);
    // console.log("");
    const OS = answer.OS;
    if (OS == "CentOS") {
      inquirer.prompt(question_centos).then((release) => {
        console.log(pad(colors.gray("\nOS: "), 25), answer.OS);
        console.log(pad(colors.gray("release: "), 10), release.release);
        console.log(" ");
        // loading(status);
        loadingProgress(machine_name);
      });
    }
    if (OS == "Ubuntu") {
      inquirer.prompt(question_ubuntun).then((release) => {
        inquirer.prompt(kernel).then((selectedKernel) => {
          if (release.release == "Ubuntu 18.04 LTS - Bionic Beaver") {
            inquirer.prompt(KVM).then((KVM_answer) => {
              inquirer.prompt(cloud_init).then((cloud_init_answer) => {
                console.log(pad(colors.gray("\nOS: "), 25), answer.OS);
                console.log(pad(colors.gray("release: "), 10), release.release);
                console.log(
                  pad(colors.gray("Kernel: "), 17),
                  selectedKernel.kernel
                );
                console.log(
                  pad(colors.gray("Register as MAAS KVM host: "), 17),
                  colors.white(KVM_answer.kvm_install)
                );
                console.log(
                  pad(colors.gray("User_data: "), 17),
                  colors.white(cloud_init_answer.user_data)
                );
                console.log(" ");
                // loading(status);
                loadingProgress(machine_name);
              });
            });
          } else {
            inquirer.prompt(cloud_init).then((cloud_init_answer) => {
              console.log(pad(colors.gray("\nOS: "), 25), answer.OS);
              console.log(pad(colors.gray("release: "), 10), release.release);
              console.log(
                pad(colors.gray("Kernel: "), 17),
                selectedKernel.kernel
              );
              console.log(
                pad(colors.gray("User_data: "), 17),
                colors.white(cloud_init_answer.user_data)
              );
              console.log(" ");
              // loading(status);
              loadingProgress(machine_name);
            });
          }
        });
      });
    }
  });
};
