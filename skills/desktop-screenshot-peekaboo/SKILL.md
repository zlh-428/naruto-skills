---
name: desktop-screenshot-peekaboo
description: Simple wrapper for Peekaboo screenshot. Unified path management and cleanup.
---

# Desktop Screenshot (Peekaboo)

Simple wrapper for Peekaboo's `image` command. Provides unified path management and periodic cleanup.

## Prerequisites

Install Peekaboo via Homebrew:

```bash
brew install steipete/tap/peekaboo
```

Grant required macOS permissions (Peekaboo will prompt on first run):
- Screen Recording
- Accessibility

## Script Directory

**Important**: All scripts are located in `scripts/` subdirectory of this skill.

**Agent Execution Instructions**:
1. Determine this SKILL.md file's directory path as `SKILL_DIR`
2. Script path = `${SKILL_DIR}/scripts/<script-name>.sh`
3. Replace all `${SKILL_DIR}` in this document with actual path

**Script Reference**:
| Script | Purpose |
|--------|---------|
| `scripts/screenshot.sh` | Screenshot and cleanup wrapper |

## Quick Start

```bash
# Capture with default settings (~/Desktop/screen.png, Retina)
npx -y bun ${SKILL_DIR}/scripts/screenshot.sh

# Custom output path
npx -y bun ${SKILL_DIR}/scripts/screenshot.sh --output /path/to/screenshot.png

# Clean old screenshots (24h)
npx -y bun ${SKILL_DIR}/scripts/screenshot.sh --clean
```

## Commands

### Capture Screenshot

```bash
# Basic capture (default path and settings)
npx -y bun ${SKILL_DIR}/scripts/screenshot.sh

# Custom path
npx -y bun ${SKILL_DIR}/scripts/screenshot.sh --output ~/Desktop/my-screenshot.png
```

### Cleanup Old Screenshots

```bash
# Delete screenshots older than 24 hours
npx -y bun ${SKILL_DIR}/scripts/screenshot.sh --clean --older-than 24

# Delete all screen*.png files
npx -y bun ${SKILL_DIR}/scripts/screenshot.sh --clean --all
```

## Options

| Option | Description | Default |
|--------|-------------|----------|
| `--output <path>` | Output path (uses directory of path if set) | `~/Desktop/screen.png` |
| `--clean` | Run cleanup instead of capture | - |
| `--older-than <hours>` | Cleanup screenshots older than N hours (with --clean) | 24 |
| `--all` | Delete all screenshots (with --clean) | - |
| `--help`, `-h` | Show help | - |

## Screenshot Path Management

The skill provides unified screenshot path management:

1. **Default path**: `~/Desktop/screen.png`
2. **Auto-cleanup**: Delete existing screenshot before capture
3. **Directory creation**: Creates output directory if not exists
4. **Periodic cleanup**: Delete old screen*.png files

### Custom Path via Environment

```bash
# Override default directory
export SCREENSHOT_DIR=/path/to/screenshots
export SCREENSHOT_NAME=screenshot.png

npx -y bun ${SKILL_DIR}/scripts/screenshot.sh
```

**Path Priority**:
1. `--output` argument (full path) or directory
2. `SCREENSHOT_DIR` environment variable (defaults to `~/Desktop`)
3. `SCREENSHOT_NAME` environment variable (defaults to `screen.png`)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SCREENSHOT_DIR` | Screenshot directory | `~/Desktop` |
| `SCREENSHOT_NAME` | Screenshot filename | `screen.png` |
| `PEEKABOO_RETINA` | Retina 2x scaling | `---retina` (enabled) |
| `PEEKABOO_MODE` | Capture mode | `--mode screen` |

## Examples

### Basic Usage

```bash
# Capture to default path (~/Desktop/screen.png)
npx -y bun ${SKILL_DIR}/scripts/screenshot.sh

# Capture to Desktop with custom name
npx -y bun ${SKILL_DIR}/scripts/screenshot.sh --output ~/Desktop/workspace.png
```

### Cleanup Workflow

```bash
# Clean screenshots older than 7 days (168 hours)
npx -y bun ${SKILL_DIR}/scripts/screenshot.sh --clean --older-than 168

# Clean all screenshots
npx -y bun ${SKILL_DIR}/scripts/screenshot.sh --clean --all
```

### Capture + Clean Automation

```bash
# 1. Capture screenshot (auto-deletes old screen.png)
SCREENSHOT_PATH=$(npx -y bun ${SKILL_DIR}/scripts/screenshot.sh)

# 2. Send via WhatsApp (example)
moltbot message send --target +1234567890 --file "$SCREENSHOT_PATH"

# 3. Periodically clean old screenshots
npx -y bun ${SKILL_DIR}/scripts/screenshot.sh --clean --older-than 168
```

## Error Handling

- **Peekaboo not found**: Provides install command
- **Permission denied**: Instructions to enable Screen Recording + Accessibility
- **Output path not writable**: Creates directory or errors with details

## Peekaboo Features

This skill is a simple wrapper that leverages Peekaboo's capabilities:

- **Retina 2x scaling**: High-resolution captures
- **Simple command**: `peekaboo image --mode screen --retina`
- **Auto-cleanup**: Delete old screen*.png files
- **Direct usage**: No complex wrapper, just pass options

## Extension Support

Custom configurations via EXTEND.md.

**Check paths** (priority order):
1. `.content-gen-skills/desktop-screenshot-peekaboo/EXTEND.md` (project)
2. `~/.content-gen-skills/desktop-screenshot-peekaboo/EXTEND.md` (user)

If found, load before workflow. Extension content overrides defaults.
