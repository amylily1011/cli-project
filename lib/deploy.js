const inquirer = require("inquirer");
const colors = require("colors");
const pad = require("pad");
const values = require("./values");
const Spinner = require("cli-spinner").Spinner;
const Table = require("cli-table");

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

module.exports = function (status) {
  inquirer.prompt(question1).then((answer) => {
    // console.log(pad(colors.gray("\nOS: "), 15), answer.OS);
    // console.log("");
    const OS = answer.OS;
    if (OS == "CentOS") {
      inquirer.prompt(question_centos).then((release) => {
        console.log(pad(colors.gray("\nOS: "), 25), answer.OS);
        console.log(pad(colors.gray("release: "), 10), release.release);
        console.log(" ");
        loading(status);
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
                loading(status);
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
              loading(status);
            });
          }
        });
      });
    }
  });
};
