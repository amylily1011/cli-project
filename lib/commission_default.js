const pad = require("pad");
const colors = require("colors");

module.exports = function (machine_name) {
  console.log("primary profile: " + "bolla-local".cyan);
  console.log("Commissioning " + machine_name.cyan + " in the background.");
  console.log("\nSuggestions:".bold);
  console.log(
    "To check the status of this machine.",
    pad("\nTry:" + " maas list [MACHINE_NAME]".cyan)
  );
  console.log(
    "\nTo deploy this a machine using default values and see waiting state.",
    pad("\nTry:" + " maas commission [MACHINE_NAME] --wait".cyan)
  );
};
