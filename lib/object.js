const pad = require("pad");
// const { long_pad } = require("./values");

const long_pad = 22;

module.exports = () => {
  console.log(
    "\nThe objects consist of one or more words to compose a unique name.\n'machine' is a primary object in maas,so by default if no object is \nprovided in the command, MAAS CLI will interpret the command as interacting \nwith machine(s). Therefore, 'maas list' and 'maas machine list' should \nprovide the same output.\n"
  );
  console.log(
    "More info: " + "https://maas.io/docs/concepts-and-terms".underline
  );
  console.log("\nBasic objects: ".bold);
  console.log(
    pad("  machine", long_pad),
    "A primary object that manages multiple or specific machine."
  );
  console.log(pad("  device", long_pad), "A non-deployable node.");
  console.log(
    pad("  network", long_pad),
    "Manage individual or multiple networks."
  );
  console.log(
    pad("  node", long_pad),
    "General term that refers to multiple, more specific object."
  );
  console.log(
    pad("  rack-controller", long_pad),
    "Manage multiple or specific rack controller."
  );
  console.log(
    pad("  region-controller", long_pad),
    "Manage multiple or specific region controller."
  );
  console.log(
    pad("  resource-pool", long_pad),
    "There is always at least one resource pool: default."
  );
  console.log(
    pad("  space", long_pad),
    "A logical grouping of subnets to communicate with one another."
  );
  console.log(
    pad("  subnet", long_pad),
    "A contiguous range of IP addresses assigned to a network."
  );
  console.log(
    pad("  tag", long_pad),
    pad(long_pad, "A property that can be associated with a node.")
  );
  console.log(
    pad("  virtual-machine", long_pad),
    "Manage multiple or specific virtual machine."
  );
  console.log(
    pad("  vm-host", long_pad),
    "Composable hardware for dynamic composition of machines."
  );
  console.log(
    pad("  zone", long_pad),
    "Physical zone, an organisational unit that contains nodes."
  );

  //Scripts:
  console.log("\nScripts: ".bold);
  console.log(
    pad("  node-script", long_pad),
    "Manage hardware commissioning and testing scripts."
  );
  console.log(
    pad("  node-script-result", long_pad),
    "Manage view of hardware commissioning and testing results."
  );
  //Network:
  console.log("\nNetworking objects: ".bold);
  console.log(
    pad("  dhcp-snippet", long_pad),
    "Manage multiple or individual DHCP snippet."
  );
  console.log(pad("  dns-resource", long_pad), "Manage DNS resources.");
  console.log(
    pad("  dns-resource-record", long_pad),
    "Manage DNS alias to existing DNS entry."
  );
  console.log(pad("  domain", long_pad), "Manage multiple or specific domain.");
  console.log(pad("  fabric", long_pad), "Manage multiple or specific fabric.");
  console.log(
    pad("  fan-network", long_pad),
    "Manage multiple or specific Fan Networks ."
  );
  console.log(
    pad("  ip-address", long_pad),
    "Manage IP addresses allocated by MAAS."
  );
  console.log(
    pad("  ip-range", long_pad),
    "Manage more reserved ranges of IP addresses."
  );
  console.log(
    pad("  interface", long_pad),
    "Manage multiple or specific physical interface."
  );
  console.log(
    pad("  space", long_pad),
    "A logical grouping of subnets for communication with one another."
  );
  console.log(
    pad("  static-route", long_pad),
    "Manage multiple or specific static route."
  );
  console.log(
    pad("  vlan", long_pad),
    "Manage multiple or specific vlan on a fabric."
  );
  //User:
  console.log("\nUser objects: ".bold);
  console.log(pad("  account", long_pad), "Manage the current logged-in user.");
  console.log(
    pad("  license-key", long_pad),
    "Manage multiple or specific license key."
  );
  console.log(
    pad("  sshkey", long_pad),
    "Manage multiple or specific SSH key."
  );
  console.log(
    pad("  sslkey", long_pad),
    "Manage multiple or specific SSL key."
  );
  console.log(
    pad("  user", long_pad),
    "Manage multiple or specific user account."
  );
  //Storage:
  console.log("\nStorage objects: ".bold);
  console.log(
    pad("  bcache", long_pad),
    "Manage multiple or specific bcache device."
  );
  console.log(
    pad("  bcache-cache-set", long_pad),
    "Manage multiple or specific cache set of bcache device."
  );
  console.log(
    pad("  block-device", long_pad),
    "Manage multiple or specific block device."
  );
  console.log(
    pad("  boot-resource", long_pad),
    "Manage multiple or specific boot resource."
  );
  console.log(
    pad("  boot-source", long_pad),
    "Manage multiple or specific boot source."
  );
  console.log(
    pad("  partition", long_pad),
    "Manage partitioning on block device(s)."
  );
  console.log(
    pad("  raid", long_pad),
    "Manage multiple or specific Redudant Array of Independent Disks (RAID)."
  );
  console.log(
    pad("  vmfs-datastore", long_pad),
    "Manage local VMware Datastore layouts."
  );
  console.log(
    pad("  volume-group", long_pad),
    "Manage mutliple or specific volume group."
  );
  //Others:
  console.log("\nOther objects: ".bold);
  console.log(
    pad("  discovery", long_pad),
    "Manage multiple or specific observed discovery."
  );
  console.log(pad("  event", long_pad), "Retrieve filtered node event.");
  console.log(
    pad("  file", long_pad),
    "Manage multiple or specific FileStorage object."
  );
  console.log(
    pad("  notification", long_pad),
    "Manage multiple or specific notification in MAAS."
  );
};
