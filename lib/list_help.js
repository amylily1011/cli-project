const pad = require("pad");
const colors = require("colors");
const { standard_pad } = require("../lib/values");

module.exports = function () {
  console.log("\n====Columns====".bold);
  console.log(
    pad(
      10,
      "The -c option takes a comma separated list of arguments that control \nwhich machine attributes to output when displaying in table or csv formats."
    )
  );
  console.log("\n====Filters====".bold);
  console.log(
    pad(
      10,
      'You may filter the output using a single keyword like "ready", \nwhich will list any machine with a string starting with "ready".' +
        "\nA regular expression on the table name such as '.*re.*01$'."
    )
  );
  console.log(
    "\nFor more information visit:",
    pad("https://maas.io/docs/common-cli-tasks#list".underline, 10)
  );
  console.log("\nExamples:".bold);
  console.log(
    "Customise columns headers in the list to show FQDN, status, core, \narchitecture, and pool." +
      "The status is filtered to only show 'ready' machines.\n" +
      " Try: " +
      'maas list -c FQDN,status="ready",core,arch,pool'.cyan
  );
  console.log(
    "\nTo list all machines with a ready status.\n" +
      " Try: " +
      "maas list --status ready".cyan
  );
  console.log("\nRelated commands".bold);
  console.log(
    pad(" show", standard_pad),
    "Display detailed information about the specific object."
  );
  console.log("");
};
