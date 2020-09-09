const pad = require("pad");
const colors = require("colors");

module.exports = function (machine_name) {
  console.log("primary profile: " + "bolla-local".cyan);
  console.log(
    "\nDeploying " +
      machine_name.cyan +
      " in the background." +
      "\nDefault values applied to this deployment are [os=ubuntu || release=18.04 || kernel=no]."
  );
  console.log(
    "\nTo check the status of this machine.",
    pad("\nTry:".cyan + " maas list [MACHINE_NAME]")
  );
  console.log(
    "\nTo deploy using interactive mode for guidlines.",
    pad("\nTry:".cyan + " maas deploy [MACHINE_NAME] -i")
  );
  console.log(
    "\nTo deploy this a machine using default values and see waiting state.",
    pad("\nTry:".cyan + " maas deploy [MACHINE_NAME] --wait")
  );
};
