---
name: desktop-screenshot-peekaboo
description: Capture desktop screenshots using Peekaboo. Automatically manages screenshot paths and cleanup with Peekaboo's clean command.
---

# Desktop Screenshot (Peekaboo)

Capture desktop screenshots using Peekaboo's `image` command. Automatically manages screenshot paths and deletes old files via Peekaboo's `clean` command.

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
2. Script path = `${SKILL_DIR}/scripts/<script-name>.ts`
3. Replace all `${SKILL_DIR}` in this document with actual path

**Script Reference**:
| Script | Purpose |
|--------|---------|
| `scripts/main.ts` | CLI entry point for desktop screenshot |
| `scripts/clean.ts` | Cleanup old screenshots |

## Quick Start

```bash
# Basic screenshot (full screen, Retina)
npx -y bun ${SKILL_DIR}/scripts/main.ts

# Custom output path
npx -y bun ${SKILL_DIR}/scripts/main.ts --output /path/to/screenshot.png

# Capture specific window
npx -y bun ${SKILL_DIR}/scripts/main.ts --window-title "Safari"

# Clean screenshots older than 24 hours
npx -y bun ${SKILL_DIR}/scripts/clean.ts --older-than 24
```

## Commands

### Basic Screenshot

```bash
# Capture with default settings
npx -y bun ${SKILL_DIR}/scripts/main.ts

# Custom output path
npx -y bun ${SKILL_DIR}/scripts/main.ts --output ~/Desktop/screenshot.png
```

### Window Capture

```bash
# Capture specific window by title
npx -y bun ${SKILL_DIR}/scripts/main.ts --window-title "Notes"

# Capture specific app
npx -y bun ${SKILL_DIR}/scripts/main.ts --app Safari
```

### Display Selection

```bash
# Capture specific display (0-based)
npx -y bun ${SKILL_DIR}/scripts/main.ts --screen-index 1

# Capture all displays
npx -y bun ${SKILL_DIR}/scripts/main.ts --mode multi
```

### Cleanup

```bash
# Delete screenshots older than 24 hours
npx -y bun ${SKILL_DIR}/scripts/clean.ts

# Delete all screenshots
npx -y bun ${SKILL_DIR}/scripts/clean.ts --all

# Preview cleanup without deleting
npx -y bun ${SKILL_DIR}/scripts/clean.ts --dry-run
```

## Options

### main.ts Options

| Option | Description | Default |
|--------|-------------|----------|
| `--output <path>`, `-o` | Output image path | `~/.peekaboo-skill/screenshot.png` |
| `--mode <type>` | Capture mode: `screen`, `window`, `frontmost`, `multi` | `screen` |
| `--screen-index <n>` | Specific display index (0-based) | 0 (first display) |
| `--app <name>` | Target app name | - |
| `--window-title <title>` | Window title to capture | - |
| `--format png|jpg` | Output format | `png` |
| `--retina` | Use Retina 2x scale | `true` |
| `--help`, `-h` | Show help | - |

### clean.ts Options

| Option | Description | Default |
|--------|-------------|----------|
| `--older-than <hours>` | Delete screenshots older than N hours | 24 |
| `--all` | Delete all screenshots | - |
| `--dry-run` | Preview without deleting | - |
| `--help`, `-h` | Show help | - |

## Screenshot Path Management

The skill automatically manages screenshot paths:

1. **Default path**: `~/.peekaboo-skill/screenshot.png` (override via `--output`)
2. **Auto-cleanup**: Use `clean.ts` to delete old screenshots
3. **Directory creation**: Creates output directory if not exists
4. **Timestamp support**: If output is a directory, appends ISO8601 timestamp

### Custom Path via Environment

```bash
export SCREENSHOT_PATH=/path/to/screenshots
npx -y bun ${SKILL_DIR}/scripts/main.ts
```

**Load Priority**: CLI args > `process.env.SCREENSHOT_PATH` > default path

## Examples

### Capture and Clean Workflow

```bash
# 1. Capture screenshot
SCREENSHOT_PATH=$(npx -y bun ${SKILL_DIR}/scripts/main.ts)

# 2. Send via WhatsApp (example)
moltbot message send --target +1234567890 --file "$SCREENSHOT_PATH"

# 3. Clean old screenshots (older than 24h)
npx -y bun ${SKILL_DIR}/scripts/clean.ts
```

### Capture Specific Window

```bash
# Capture Safari window
npx -y bun ${SKILL_DIR}/scripts/main.ts --app Safari

# Capture window by title
npx -y bun ${SKILL_DIR}/scripts/main.ts --window-title "Release Notes"
```

### Periodic Cleanup

```bash
# Clean screenshots older than 7 days (168 hours)
npx -y bun ${SKILL_DIR}/scripts/clean.ts --older-than 168

# Clean all screenshots
npx -y bun ${SKILL_DIR}/scripts/clean.ts --all
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SCREENSHOT_PATH` | Default screenshot output path | `~/.peekaboo-skill/screenshot.png` |
| `SCREENSHOT_RETINA` | Enable Retina 2x scale | `true` |
| `SCREENSHOT_FORMAT` | Output format (png/jpg) | `png` |
| `SCREENSHOT_CLEANUP_HOURS` | Default cleanup age threshold | `24` |

## Error Handling

- **Peekaboo not found**: Provides install command
- **Permission denied**: Instructions to enable Screen Recording + Accessibility
- **No displays found**: Troubleshooting steps
- **Output path not writable**: Creates directory or errors with details

## Peekaboo Features

This skill leverages Peekaboo's advanced capabilities:

- **Retina 2x scaling**: High-resolution captures
- **Window/Screen/Menu modes**: Flexible capture targets
- **Multi-display support**: Capture specific or all screens
- **Built-in cleanup**: `peekaboo clean` manages snapshot cache
- **JSON output**: Machine-readable for automation

## Extension Support

Custom configurations via EXTEND.md.

**Check paths** (priority order):
1. `.content-gen-skills/desktop-screenshot-peekaboo/EXTEND.md` (project)
2. `~/.content-gen-skills/desktop-screenshot-peekaboo/EXTEND.md` (user)

If found, load before workflow. Extension content overrides defaults.
