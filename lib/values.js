const Table = require("cli-table");

exports.standard_pad = 15;
exports.long_pad = 20;
exports.front_pad = 5;
exports.longest_pad = 35;

exports.commands = [
  {
    list: "List all machines in MAAS.",
  },
];

exports.machineTable = new Table({
  head: [
    "FQDN".cyan.bold,
    "POWER".cyan.bold,
    "TYPE".cyan.bold,
    "STATUS".cyan.bold,
    // "Owner",
    // "Arch",
    "CORES".cyan.bold,
    "RAM".cyan.bold,
    // "Pool",
    // "Zone",
    // "Fabric",
    "IP ADDRESS".cyan.bold,
  ],
  chars: {'top':'', 'top-mid': '' , 'top-left': '' , 'top-right': ''
  , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
  , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
  , 'right': '' , 'right-mid': '' , 'middle': ' ' },
  // style: {'padding-left': 0, 'padding-right': 0 }
});

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
    "unknown",
    "Virsh",
    "Acquired",
    // "-",
    // "amd64",
    "   1",
    "2GiB",
    // "default",
    // "default",
    // "bolla-lxdbr0",
    " ",
  ],
  [
    "legal-finch.maas",
    "On",
    "Lxd",
    "Ubuntu 20.04 LTS",
    // "admin",
    // "amd64",
    "   1",
    "2GiB",
    // "default",
    // "default",
    // "bolla-lxdbr0",
    "192.168.123.12",
  ],
  [
    "still-foal.maas",
    "off",
    "Lxd",
    "Acquired",
    // "admin",
    // "amd64",
    "   1",
    "2GiB",
    // "default",
    // "default",
    // "bolla-lxdbr0",
    " ",
  ],
  [
    "cape-foal.maas",
    "off",
    "Virsh",
    "Ready",
    // "Adam",
    // "amd64",
    "   4",
    "2GiB",
    // "default",
    // "default",
    // "bolla-lxdbr0",
    " ",
  ],
];

exports.commissionMachine = [
  [
    "known-viper.maas",
    "unknown (Virsh)",
    "Failed commission",
    // "-",
    // "amd64",
    "1",
    "2GiB",
    // "default",
    // "default",
    // "bolla-lxdbr0",
    " ",
  ],
  [
    "legal-finch.maas",
    "On (Lxd)",
    "Failed commission",
    // "admin",
    // "amd64",
    "1",
    "2GiB",
    // "default",
    // "default",
    // "bolla-lxdbr0",
    " ",
  ],
  [
    "still-foal.maas",
    "off (Lxd)",
    "Failed commission",
    // "admin",
    // "amd64",
    "1",
    "2GiB",
    // "default",
    // "default",
    // "bolla-lxdbr0",
    " ",
  ],
  [
    "cape-foal.maas",
    "off (Virsh)",
    "Failed commission",
    // "Adam",
    // "amd64",
    "4",
    "2GiB",
    // "default",
    // "default",
    // "bolla-lxdbr0",
    " ",
  ],
];

exports.deployMachine = [
  [
    "known-viper.maas",
    "On (Virsh)",
    "Deployed",
    // "-",
    // "amd64",
    "1",
    "2GiB",
    // "default",
    // "default",
    // "bolla-lxdbr0",
    "192.168.123.12",
  ],
  [
    "legal-finch.maas",
    "On (Lxd)",
    "Deployed",
    // "admin",
    // "amd64",
    "1",
    "2GiB",
    // "default",
    // "default",
    // "bolla-lxdbr0",
    "192.168.123.12",
  ],
  [
    "still-foal.maas",
    "On (Lxd)",
    "Deployed",
    // "admin",
    // "amd64",
    "1",
    "2GiB",
    // "default",
    // "default",
    // "bolla-lxdbr0",
    "192.168.123.12",
  ],
  [
    "cape-foal.maas",
    "off (Virsh)",
    "Deployed",
    // "Adam",
    // "amd64",
    "4",
    "2GiB",
    // "default",
    // "default",
    // "bolla-lxdbr0",
    "192.168.123.12",
  ],
];

//OS
exports.OS = [{ name: "ubuntu" }, { name: "centOS" }];

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
