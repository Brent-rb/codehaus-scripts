codehaus-scripts
=================

A collection of scripts written by Codehaus


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/codehaus-scripts.svg)](https://npmjs.org/package/codehaus-scripts)
[![Downloads/week](https://img.shields.io/npm/dw/codehaus-scripts.svg)](https://npmjs.org/package/codehaus-scripts)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g codehaus-scripts
$ cscripts COMMAND
running command...
$ cscripts (--version)
codehaus-scripts/0.0.0 darwin-arm64 node-v22.11.0
$ cscripts --help [COMMAND]
USAGE
  $ cscripts COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cscripts hello PERSON`](#cscripts-hello-person)
* [`cscripts hello world`](#cscripts-hello-world)
* [`cscripts help [COMMAND]`](#cscripts-help-command)
* [`cscripts plugins`](#cscripts-plugins)
* [`cscripts plugins add PLUGIN`](#cscripts-plugins-add-plugin)
* [`cscripts plugins:inspect PLUGIN...`](#cscripts-pluginsinspect-plugin)
* [`cscripts plugins install PLUGIN`](#cscripts-plugins-install-plugin)
* [`cscripts plugins link PATH`](#cscripts-plugins-link-path)
* [`cscripts plugins remove [PLUGIN]`](#cscripts-plugins-remove-plugin)
* [`cscripts plugins reset`](#cscripts-plugins-reset)
* [`cscripts plugins uninstall [PLUGIN]`](#cscripts-plugins-uninstall-plugin)
* [`cscripts plugins unlink [PLUGIN]`](#cscripts-plugins-unlink-plugin)
* [`cscripts plugins update`](#cscripts-plugins-update)

## `cscripts hello PERSON`

Say hello

```
USAGE
  $ cscripts hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ cscripts hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/Brent-rb/codehaus-scripts/blob/v0.0.0/src/commands/hello/index.ts)_

## `cscripts hello world`

Say hello world

```
USAGE
  $ cscripts hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ cscripts hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/Brent-rb/codehaus-scripts/blob/v0.0.0/src/commands/hello/world.ts)_

## `cscripts help [COMMAND]`

Display help for cscripts.

```
USAGE
  $ cscripts help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for cscripts.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.19/src/commands/help.ts)_

## `cscripts plugins`

List installed plugins.

```
USAGE
  $ cscripts plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ cscripts plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.22/src/commands/plugins/index.ts)_

## `cscripts plugins add PLUGIN`

Installs a plugin into cscripts.

```
USAGE
  $ cscripts plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into cscripts.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the CSCRIPTS_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the CSCRIPTS_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ cscripts plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ cscripts plugins add myplugin

  Install a plugin from a github url.

    $ cscripts plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ cscripts plugins add someuser/someplugin
```

## `cscripts plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ cscripts plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ cscripts plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.22/src/commands/plugins/inspect.ts)_

## `cscripts plugins install PLUGIN`

Installs a plugin into cscripts.

```
USAGE
  $ cscripts plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into cscripts.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the CSCRIPTS_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the CSCRIPTS_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ cscripts plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ cscripts plugins install myplugin

  Install a plugin from a github url.

    $ cscripts plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ cscripts plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.22/src/commands/plugins/install.ts)_

## `cscripts plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ cscripts plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ cscripts plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.22/src/commands/plugins/link.ts)_

## `cscripts plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ cscripts plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cscripts plugins unlink
  $ cscripts plugins remove

EXAMPLES
  $ cscripts plugins remove myplugin
```

## `cscripts plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ cscripts plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.22/src/commands/plugins/reset.ts)_

## `cscripts plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ cscripts plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cscripts plugins unlink
  $ cscripts plugins remove

EXAMPLES
  $ cscripts plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.22/src/commands/plugins/uninstall.ts)_

## `cscripts plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ cscripts plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cscripts plugins unlink
  $ cscripts plugins remove

EXAMPLES
  $ cscripts plugins unlink myplugin
```

## `cscripts plugins update`

Update installed plugins.

```
USAGE
  $ cscripts plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.22/src/commands/plugins/update.ts)_
<!-- commandsstop -->
# codehaus-scripts
