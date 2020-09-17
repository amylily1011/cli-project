const pad = require("pad");
const { standard_pad, long_pad } = require("./values");

module.exports = (version) => {
  console.log(
    "\nWelcome to MAAS CLI. MAAS CLI controls and configures your virtual machines, hardwares, and devices."
  );
  console.log("verion: " + version.cyan);
  console.log("primary profile: " + "bolla-local".cyan);
  console.log(
    "\nUsage:" + " maas [MAAS object] [ACTION] [OPTIONS] [ARGUMENTS]"
  );
  console.log(
    "\nTo list all available objects in maas.",
    pad("\nTry:" + " maas object list".cyan, 10)
  );

  console.log(
    "\nTo list all profiles that are logged in.",
    pad("\nTry:" + " maas profile list".cyan, 10)
  );
  //Basic commands
  console.log("\nBasic commands: ".bold);
  console.log(
    pad(" list", standard_pad),
    "List summary information about one or multiple objects."
  );
  console.log(
    pad(" show", standard_pad),
    "Display detailed information about the specific object."
  );
  console.log(
    pad(" create", standard_pad),
    "Create a new occurrence of the specific object."
  );
  console.log(
    pad(" delete", standard_pad),
    "Delete a specific object. For VMs, its resources will be available for other VMs."
  );

  //Basic actions
  console.log("\nBasic actions: ".bold);
  console.log(pad(" acquire", standard_pad), "Acquire all ready machines.");

  console.log(
    pad(" commision", standard_pad),
    "Commission all machines in 'New' state."
  );

  console.log(
    pad(" deploy", standard_pad),
    "Deploy all allocated machines or include specific attributes."
  );

  console.log(
    pad(" release", standard_pad),
    "Release a machine that is deployed or allocated."
  );
  //Node management commands:
  console.log("\nManagement commands: ".bold);
  console.log(pad(" set-timeout", standard_pad), "Set deployment timeout.");
  console.log(
    pad(" set-kernel", standard_pad),
    "Set a minimum kernel for all new and commissioned machines."
  );
  console.log(
    pad(" disable-proxy", standard_pad),
    "Disable proxying completely."
  );
  //Toubleshooting and debugging commands:
  console.log("\nTroubleshooting and debugging: ".bold);
  console.log(pad(" log", standard_pad), "Show logs for a specific machine.");

  //Options:
  console.log("\nOptions: ".bold);
  console.log(pad(" -h,--help", long_pad), "Display help for command.");
  console.log(pad(" -V,--version", long_pad), "Output the version number.");
  console.log(pad(" --color-off", long_pad), "Disable coloring.");
  console.log(
    pad(" -i, --interactive", long_pad),
    "Enable interactive mode and walk through missing arguments."
  );
  console.log("\n");
};
