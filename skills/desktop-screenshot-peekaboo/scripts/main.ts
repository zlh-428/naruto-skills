#!/usr/bin/env -S bun

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';

const SCREENSHOT_PATH = process.env.SCREENSHOT_PATH || 
  resolve(process.env.HOME || '', '.peekaboo-skill/screenshot.png');
const SCREENSHOT_RETINA = process.env.SCREENSHOT_RETINA !== 'false';
const SCREENSHOT_FORMAT = process.env.SCREENSHOT_FORMAT || 'png';
const SCREENSHOT_MODE = process.env.SCREENSHOT_MODE || 'screen';

interface Args {
  output?: string;
  mode?: string;
  screenIndex?: number;
  app?: string;
  windowTitle?: string;
  format?: string;
  retina?: boolean;
  help?: boolean;
}

function parseArgs(): Args {
  const args: Args = {};
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    switch (arg) {
      case '--output':
      case '-o':
        args.output = process.argv[++i];
        break;
      case '--mode':
      case '-m':
        args.mode = process.argv[++i];
        break;
      case '--screen-index':
      case '-d':
        args.screenIndex = parseInt(process.argv[++i]);
        break;
      case '--app':
      case '-a':
        args.app = process.argv[++i];
        break;
      case '--window-title':
      case '-w':
        args.windowTitle = process.argv[++i];
        break;
      case '--format':
      case '-f':
        args.format = process.argv[++i];
        break;
      case '--retina':
        args.retina = true;
        break;
      case '--no-retina':
        args.retina = false;
        break;
      case '--help':
      case '-h':
        args.help = true;
        break;
    }
  }
  return args;
}

function showHelp() {
  console.log('Desktop Screenshot (Peekaboo) - Capture desktop screenshots\n');
  console.log('Usage:');
  console.log('  npx bun main.ts [options]\n');
  console.log('Options:');
  console.log('  -o, --output <path>     Output image path (default: ~/.peekaboo-skill/screenshot.png)');
  console.log('  -m, --mode <type>       Capture mode: screen, window, frontmost, multi (default: screen)');
  console.log('  -d, --screen-index <n>   Display index (0-based, default: 0)');
  console.log('  -a, --app <name>        Target app name');
  console.log('  -w, --window-title <t>   Window title to capture');
  console.log('  -f, --format <fmt>      Output format: png or jpg (default: png)');
  console.log('      --retina             Use Retina 2x scaling (default: enabled)');
  console.log('      --no-retina          Disable Retina scaling');
  console.log('  -h, --help              Show this help\n');
  console.log('Environment Variables:');
  console.log('  SCREENSHOT_PATH           Default screenshot output path');
  console.log('  SCREENSHOT_RETINA         Retina scaling (true/false, default: true)');
  console.log('  SCREENSHOT_FORMAT         Output format (png/jpg, default: png)');
  console.log('  SCREENSHOT_MODE           Capture mode (default: screen)');
}

function checkPeekaboo(): void {
  try {
    execSync('which peekaboo', { stdio: 'ignore' });
  } catch {
    console.error('Error: Peekaboo not found.');
    console.error('Install with: brew install steipete/tap/peekaboo');
    process.exit(1);
  }
}

function ensureDirectory(path: string): void {
  const dir = dirname(path);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function captureScreenshot(args: Args): string {
  let cmd = 'peekaboo image --mode ' + (args.mode || SCREENSHOT_MODE);
  
  // Add format
  const format = args.format || SCREENSHOT_FORMAT;
  cmd += ' --format ' + format;
  
  // Add Retina
  const retina = args.retina !== undefined ? args.retina : SCREENSHOT_RETINA;
  if (retina) {
    cmd += ' --retina';
  } else {
    cmd += ' --no-retina'; // Peekaboo defaults to retina
  }
  
  // Add app target
  if (args.app) {
    cmd += ' --app "' + args.app + '"';
  }
  
  // Add window title
  if (args.windowTitle) {
    cmd += ' --window-title "' + args.windowTitle + '"';
  }
  
  // Add screen index
  if (args.screenIndex !== undefined) {
    cmd += ' --screen-index ' + args.screenIndex;
  }
  
  // Add output path
  const outputPath = resolve(args.output || SCREENSHOT_PATH);
  cmd += ' --path "' + outputPath + '"';
  
  try {
    execSync(cmd, { stdio: 'pipe' });
    return outputPath;
  } catch (err) {
    console.error('Error capturing screenshot:');
    if (err instanceof Error) {
      console.error(err.message);
      if (err.message.includes('Permission')) {
        console.error('\nNote: Screen Recording + Accessibility permissions may be required.');
        console.error('Run: peekaboo permissions grant');
      }
    }
    process.exit(1);
  }
}

function main() {
  const args = parseArgs();
  
  // Show help
  if (args.help) {
    showHelp();
    process.exit(0);
  }
  
  // Check prerequisites
  checkPeekaboo();
  
  // Determine output path
  const outputPath = resolve(args.output || SCREENSHOT_PATH);
  
  // Ensure directory exists
  ensureDirectory(outputPath);
  
  // Capture screenshot
  const resultPath = captureScreenshot(args);
  
  // Output result
  console.log(resultPath);
}

main();
