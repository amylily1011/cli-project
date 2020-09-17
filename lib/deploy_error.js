const pad = require("pad");
const colors = require("colors");

module.exports = function () {
  console.log("primary profile: " + "bolla-local".cyan);
  console.log("Error: ".red + "Missing argument [MACHINE_NAME] or [OPTION].");
  console.log(
    "Enter a [MACHINE_NAME] or use --status or --filter to deploy multiple machines."
  );
  console.log(
    pad("\nUse:" + " maas deploy --help", 10),
    "To find out more about this command"
  );
  console.log(
    "For more information visit:",

    pad(
      "https://maas.io/docs/common-cli-tasks#heading--deploy-a-node".underline,
      10
    )
  );
  console.log("");
  console.log("Examples:");
  console.log(
    "To try out interactive mode.",
    pad("\nTry:" + " maas deploy -i".cyan, 10)
  );
  console.log(
    "\nTo deploy a single machine by machine name.",
    pad("\nTry:" + " maas deploy <MACHINE_NAME>".cyan, 10)
  );
  console.log(
    "\nTo deploy all machines that are allocated.",
    pad("\nTry:" + " maas deploy -s allocated".cyan, 10)
  );
  console.log(
    "\nTo deploy multiple machines with status=allocated and CPU cores=4. Separate by comma.",
    pad("\nTry:" + " maas deploy --filter status=allocated,core=4 ".cyan, 10)
  );
  console.log("");
};
