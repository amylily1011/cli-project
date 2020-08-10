const inquirer = require("inquirer");
const colors = require("colors");
const pad = require("pad");
const values = require("./values");
const Spinner = require("cli-spinner").Spinner;
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

const question1 = [
  {
    type: "list",
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
    type: "list",
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

function loading() {
  const spinner = new Spinner(
    "Deploying".blue + " 4 machines, this can take a while...%s"
  );
  spinner.setSpinnerString("|/-\\");
  spinner.start();
  setTimeout(() => {
    spinner.stop();
    console.log("\n" + "Error!".red + " 4 mahines cannot be deployed.\n");
  }, 1000);
}

module.exports = function () {
  inquirer.prompt(question1).then((answer) => {
    // console.log(pad(colors.gray("\nOS: "), 15), answer.OS);
    // console.log("");
    const OS = answer.OS;
    if (OS == "CentOS") {
      inquirer.prompt(question_centos).then((release) => {
        console.log(pad(colors.gray("\nOS: "), 25), answer.OS);
        console.log(pad(colors.gray("release: "), 10), release.release);
        console.log(" ");
        loading();
      });
    }
    if (OS == "Ubuntu") {
      inquirer.prompt(question_ubuntun).then((release) => {
        inquirer.prompt(kernel).then((selectedKernel) => {
          if (release.release == "Ubuntu 18.04 LTS - Bionic Beaver") {
            inquirer.prompt(KVM).then((KVM_answer) => {
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
              console.log(" ");
              loading();
            });
          } else {
            console.log(pad(colors.gray("\nOS: "), 25), answer.OS);
            console.log(pad(colors.gray("release: "), 10), release.release);
            console.log(
              pad(colors.gray("Kernel: "), 17),
              selectedKernel.kernel
            );
            console.log(" ");
            loading();
          }
        });
      });
    }
  });
};
