# cli-project
maas CLI prototype for the new CLI.

To test it out.
1. Clone this project into a directory and cd to that directory.

2. Install the npm packages and dependencies globally.
`npm install` or install globally `npm install -g`

Commands you can play with:

Initial help (cheat sheet):
`maas`

List all available objects:
`maas object list`

List all machines:
`maas list`

List one machine:
`maas list [machine_name]`

List all machines in json format:
`maas list --format json`

Commission a machine:
`maas commission [machine_name]`

Deploy a machine:
`maas deploy [machine_name]`

Deploy a machine and see loading state:
`maas deploy [machine_name] --wait`

Deploy a machine in interactive mode:
`maas deploy [machine_name] -i`

Deploy all allocated machines with default values:
`maas deploy -s allocated`

Deploy all allocated machines in interactive mode:
`maas deploy -s allocated -i`

Deploy all machines using default values and see it loading:
`maas deploy -s allocated --wait`
