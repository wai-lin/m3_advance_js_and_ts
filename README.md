# Shath

PATH manager CLI tool for zsh.

## Installation

Since Shath is not published to npm, you can install it locally by following these steps:

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies and build the package:

```bash
npm install
npm run build
```

4. Install globally:

```bash
npm install -g .
```

## Usage

To use Shath, run the following command:

```bash
shath
```

#### Initial Setup

First, create the `.shathrc` configuration file:

```bash
shath --setup
```

You can specify a custom config folder:

```bash
shath --setup --config /path/to/folder
```

After creating `.shathrc`, add the following line to your `.zshrc` file:

```bash
source ~/.shathrc
# or
source </path/to/folder>/.shathrc
```

### Commands

| Command | Alias | Description |
|---|---|---|
| `--config` | | Path to folder containing `.shathrc` file |
| `--setup` | | Create `.shathrc` file |
| `--set` | `--se` | Set PATH variable |
| `--listAll` | `--lsa` | List all PATH variables including system PATH |
| `--list` | `--ls` | List PATH variables defined in `.shathrc` file |
| `--remove` | `--rm` | Remove PATH variable |

### Examples

#### Adding PATH Variables

Add a new PATH to your configuration:

```bash
shath --set /usr/local/go/bin
```

Or use the alias:

```bash
shath --se /home/user/.local/bin
```

#### Listing PATH Variables

List all PATH variables (including system paths):

```bash
shath --listAll
# or
shath --lsa
```

List only PATH variables defined in `.shathrc`:

```bash
shath --list
# or
shath --ls
```

#### Removing PATH Variables

Remove a PATH by specifying the full path:

```bash
shath --remove /usr/local/go/bin
# or
shath --rm /usr/local/go/bin
```

Remove a PATH by its index number (shown in `--list` output):

```bash
shath --remove 2
# or
shath --rm 2
```

#### Using Custom Config Location

All commands support the `--config` flag to specify a custom configuration folder:

```bash
shath --config /path/to/folder --set /custom/path
shath --config /path/to/folder --list
```
