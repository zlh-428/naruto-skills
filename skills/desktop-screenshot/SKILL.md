---
name: desktop-screenshot
description: Capture desktop screenshots using imagesnap. Automatically manages screenshot paths and cleanup old files.
---

# Desktop Screenshot

Capture desktop screenshots using `imagesnap`. Automatically manages screenshot paths and deletes old files before capturing.

## Prerequisites

Install `imagesnap` via Homebrew:

```bash
brew install imagesnap
```

## Script Directory

**Important**: All scripts are located in `scripts/` subdirectory of this skill.

**Agent Execution Instructions**:
1. Determine this SKILL.md file's directory path as `SKILL_DIR`
2. Script path = `${SKILL_DIR}/scripts/<script-name>.ts`
3. Replace all `${SKILL_DIR}` in this document with actual path

**Script Reference**:
| Script | Purpose |
|--------|---------|
| `scripts/main.ts` | CLI entry point for desktop screenshot |

## Quick Start

```bash
# Basic screenshot
npx -y bun ${SKILL_DIR}/scripts/main.ts

# Custom output path
npx -y bun ${SKILL_DIR}/scripts/main.ts --output /path/to/screenshot.png

# Specify display number
npx -y bun ${SKILL_DIR}/scripts/main.ts --display 1

```

## Commands

### Basic Screenshot

```bash
# Capture with default path
npx -y bun ${SKILL_DIR}/scripts/main.ts

# Or shorthand
npx -y bun ${SKILL_DIR}/scripts/main.ts -o screenshot.png
```

### Custom Path

```bash
# Specify custom output path
npx -y bun ${SKILL_DIR}/scripts/main.ts --output /tmp/my-screenshot.png
```

### Multiple Displays

```bash
# Capture specific display (1 = main, 2 = secondary, etc.)
npx -y bun ${SKILL_DIR}/scripts/main.ts --display 1

# List available displays
npx -y bun ${SKILL_DIR}/scripts/main.ts --list-displays
```

## Options

| Option | Description | Default |
|--------|-------------|----------|
| `--output <path>`, `-o` | Output image path | `~/.content-gen-skills/desktop-screenshot/screenshot.png` |
| `--display <number>`, `-d` | Display number to capture | 1 (main) |
| `--list-displays` | List available displays | - |
| `--help`, `-h` | Show help | - |

## Screenshot Path Management

The skill automatically manages screenshot paths:

1. **Default path**: `~/.content-gen-skills/desktop-screenshot/screenshot.png`
2. **Auto-cleanup**: Deletes existing screenshot before capturing
3. **Directory creation**: Creates output directory if not exists

### Custom Path via Environment

You can override the default path via environment variable:

```bash
export SCREENSHOT_PATH=/path/to/screenshots
npx -y bun ${SKILL_DIR}/scripts/main.ts
```

**Load Priority**: CLI args > `process.env.SCREENSHOT_PATH` > default path

## Examples

### Capture with Default Settings

```bash
npx -y bun ${SKILL_DIR}/scripts/main.ts
# Output: ~/.content-gen-skills/desktop-screenshot/screenshot.png
```

### Capture to Custom Location

```bash
npx -y bun ${SKILL_DIR}/scripts/main.ts --output ~/Desktop/capture.png
```

### Capture Secondary Display

```bash
npx -y bun ${SKILL_DIR}/scripts/main.ts --display 2 --output display2.png
```

### Workflow: Capture and Send

```bash
# Capture (auto-deletes old)
SCREENSHOT_PATH=$(npx -y bun ${SKILL_DIR}/scripts/main.ts)

# Send via WhatsApp (example)
moltbot message send --target +1234567890 --file "$SCREENSHOT_PATH"
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SCREENSHOT_PATH` | Default screenshot output path | `~/.content-gen-skills/desktop-screenshot/screenshot.png` |
| `SCREENSHOT_DISPLAY` | Default display number | 1 |

## Error Handling

- **imagesnap not found**: Provides install command
- **Permission denied**: Instructions to enable screen recording permissions
- **Invalid display**: Lists available displays
- **Output path not writable**: Creates directory or errors with details

## Extension Support

Custom configurations via EXTEND.md.

**Check paths** (priority order):
1. `.content-gen-skills/desktop-screenshot/EXTEND.md` (project)
2. `~/.content-gen-skills/desktop-screenshot/EXTEND.md` (user)

If found, load before workflow. Extension content overrides defaults.
