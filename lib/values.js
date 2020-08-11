exports.commands = [
  {
    list: "List all machines in MAAS.",
  },
];

exports.machines = [
  {
    Hostname: "known-viper.maas",
    Power: "unknown (virsh)",
    Status: "New",
    Owner: "-",
    Arch: "amd64",
    CPUs: "1",
    RAM: "2GiB",
    Pool: "default",
    Zone: "default",
    Fabric: "bolla-lxdbr0",
    Subnet: "192.168.123.0/24",
  },
  {
    Hostname: "legal-finch.maas",
    Power: "On (Lxd)",
    Status: "Ubuntu 20.04 LTS",
    Owner: "admin",
    Arch: "amd64",
    CPUs: "1",
    RAM: "2GiB",
    Pool: "default",
    Zone: "default",
    Fabric: "bolla-lxdbr0",
    Subnet: "192.168.123.0/24",
  },
  {
    Hostname: "still-foal.maas",
    Power: "off (Lxd)",
    Status: "Ready",
    Owner: "admin",
    Arch: "amd64",
    CPUs: "1",
    RAM: "2GiB",
    Pool: "default",
    Zone: "default",
    Fabric: "bolla-lxdbr0",
    Subnet: "192.168.123.0/24",
  },
  {
    Hostname: "cape-foal.maas",
    Power: "off (Lxd)",
    Status: "Ready",
    Owner: "admin",
    Arch: "amd64",
    CPUs: "4",
    RAM: "2GiB",
    Pool: "default",
    Zone: "default",
    Fabric: "bolla-lxdbr0",
    Subnet: "192.168.123.0/24",
  },
];

exports.machinesData = [
  [
    "known-viper.maas",
    "unknown (Virsh)",
    "New",
    "-",
    "amd64",
    "1",
    "2GiB",
    "default",
    "default",
    "bolla-lxdbr0",
    "192.168.123.0/24",
  ],
  [
    "legal-finch.maas",
    "On (Lxd)",
    "Ubuntu 20.04 LTS",
    "admin",
    "amd64",
    "1",
    "2GiB",
    "default",
    "default",
    "bolla-lxdbr0",
    "192.168.123.0/14",
  ],
  [
    "still-foal.maas",
    "off (Lxd)",
    "New",
    "admin",
    "amd64",
    "1",
    "2GiB",
    "default",
    "default",
    "bolla-lxdbr0",
    "192.168.123.0/44",
  ],
  [
    "cape-foal.maas",
    "off (Virsh)",
    "Ready",
    "Adam",
    "amd64",
    "4",
    "2GiB",
    "default",
    "default",
    "bolla-lxdbr0",
    "192.168.123.0/94",
  ],
];

exports.commissionMachine = [
  [
    "known-viper.maas",
    "unknown (Virsh)",
    "Ready",
    "-",
    "amd64",
    "1",
    "2GiB",
    "default",
    "default",
    "bolla-lxdbr0",
    "192.168.123.0/24",
  ],
  [
    "legal-finch.maas",
    "On (Lxd)",
    "Ready",
    "admin",
    "amd64",
    "1",
    "2GiB",
    "default",
    "default",
    "bolla-lxdbr0",
    "192.168.123.0/14",
  ],
  [
    "still-foal.maas",
    "off (Lxd)",
    "New",
    "admin",
    "amd64",
    "1",
    "2GiB",
    "default",
    "default",
    "bolla-lxdbr0",
    "192.168.123.0/44",
  ],
  [
    "cape-foal.maas",
    "off (Virsh)",
    "Failed commission",
    "Adam",
    "amd64",
    "4",
    "2GiB",
    "default",
    "default",
    "bolla-lxdbr0",
    "192.168.123.0/94",
  ],
];

// sugar levels
exports.sugar = [
  { name: "Low", spoons: "1" },
  { name: "Medium", spoons: "2" },
  { name: "High", spoons: "3" },
  { name: "Very High", spoons: "4" },
];
exports.sugarPlain = exports.sugar.map(function (o) {
  return o.name + " (" + o.spoons + " spoons)"; // convert to one line
});

//OS
exports.OS = [{ name: "Ubuntu" }, { name: "CentOS" }];

//Ubuntu
exports.ubuntu_releases = [
  { name: "Ubuntu 16.04 LTS - Xenial Xerus" },
  { name: "Ubuntu 18.04 LTS - Bionic Beaver" },
  { name: "Ubuntu 20.04 LST - Focal Fossa" },
  { name: "Ubuntu 20.10 LTS - Groovy Gorilla" },
];

//machineNames
exports.machineNames = [
  { name: "known-viper.maas" },
  { name: "legal-finch.maas" },
  { name: "still-foal.maas" },
  { name: "cape-foal.maas" },
];

exports.centos_releases = [{ name: "CentOS 7" }];

// served in
exports.servedIn = ["Mug", "Cup", "Takeway package"];
