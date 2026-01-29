#!/usr/bin/env bash

# Desktop Screenshot - Simple wrapper for Peekaboo

# Configuration
SCREENSHOT_DIR="${SCREENSHOT_DIR:-$HOME/Desktop}"
SCREENSHOT_NAME="${SCREENSHOT_NAME:-screen.png}"
SCREENSHOT_PATH="$SCREENSHOT_DIR/$SCREENSHOT_NAME"

# Default options
RETINA="${PEEKABOO_RETINA:---retina}"

function show_help() {
  echo "Desktop Screenshot - Capture via Peekaboo"
  echo ""
  echo "Usage: screenshot.sh [options]"
  echo ""
  echo "Options:"
  echo "  --output <path>      Custom output path"
  echo "  --clean              Clean old screenshots"
  echo "  --all                Clean all screenshots"
  echo "  --older-than <hours> Clean screenshots older than N hours (default: 24)"
  echo "  --help, -h          Show help"
  echo ""
  echo "Environment:"
  echo "  SCREENSHOT_DIR       Screenshot directory (default: ~/Desktop)"
  echo "  SCREENSHOT_NAME       Screenshot filename (default: screen.png)"
  echo "  PEEKABOO_RETINA    Enable Retina (default: enabled)"
}

function capture_screenshot() {
  local output_path="$1"
  # Use Peekaboo directly
  peekaboo image --mode screen "$RETINA" --path "$output_path"
}

function clean_screenshots() {
  local older_than="${1:-24}"
  local all_flag="$2"
  
  if [ "$all_flag" = "true" ]; then
    # Clean all screen*.png files
    find "$SCREENSHOT_DIR" -maxdepth 1 -name "screen*.png" -type f -delete
    echo "Cleaned all screenshots from $SCREENSHOT_DIR"
  else
    # Clean screenshots older than N hours
    find "$SCREENSHOT_DIR" -maxdepth 1 -name "screen*.png" -type f -mtime +"${older_than}h" -delete
    echo "Cleaned screenshots older than $older_than hours from $SCREENSHOT_DIR"
  fi
}

# Parse arguments
OUTPUT_PATH=""
CLEAN=false
CLEAN_ALL=false
OLDER_THAN=24

while [[ $# -gt 0 ]]; do
  case "$1" in
    --output)
      OUTPUT_PATH="$2"
      shift 2
      ;;
    --clean)
      CLEAN=true
      shift
      ;;
    --all)
      CLEAN=true
      CLEAN_ALL=true
      shift
      ;;
    --older-than)
      OLDER_THAN="$2"
      shift 2
      ;;
    --help|-h)
      show_help
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      show_help
      exit 1
      ;;
  esac
done

# Execute
if [ "$CLEAN" = "true" ]; then
  clean_screenshots "$OLDER_THAN" "$CLEAN_ALL"
else
  # Capture screenshot
  local final_path="${OUTPUT_PATH:-$SCREENSHOT_PATH}"
  
  # Ensure directory exists
  mkdir -p "$(dirname "$final_path")"
  
  # Delete old screenshot if it exists
  if [ -f "$final_path" ]; then
    rm "$final_path"
  fi
  
  capture_screenshot "$final_path"
  
  # Output result
  echo "$final_path"
fi
