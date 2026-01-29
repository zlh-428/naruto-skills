#!/usr/bin/env -S bun

import { execSync } from 'child_process';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { dirname, resolve } from 'path';

const SCREENSHOT_PATH = process.env.SCREENSHOT_PATH || 
  resolve(process.env.HOME || '', '.content-gen-skills/desktop-screenshot/screenshot.png');

const DEFAULT_DISPLAY = parseInt(process.env.SCREENSHOT_DISPLAY || '1');

interface Args {
  output?: string;
  display?: number;
  listDisplays?: boolean;
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
      case '--display':
      case '-d':
        args.display = parseInt(process.argv[++i]);
        break;
      case '--list-displays':
        args.listDisplays = true;
        break;
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
    }
  }
  return args;
}

function showHelp() {
  console.log('Desktop Screenshot - Capture desktop screenshots using imagesnap\n');
  console.log('Usage:');
  console.log('  npx bun main.ts [options]\n');
  console.log('Options:');
  console.log('  -o, --output <path>     Output image path (default: ~/.content-gen-skills/desktop-screenshot/screenshot.png)');
  console.log('  -d, --display <number>   Display number to capture (default: 1)');
  console.log('      --list-displays      List available displays');
  console.log('  -h, --help              Show this help\n');
  console.log('Environment Variables:');
  console.log('  SCREENSHOT_PATH           Default screenshot output path');
  console.log('  SCREENSHOT_DISPLAY        Default display number (1 = main)');
}

function checkImagesnap(): void {
  try {
    execSync('which imagesnap', { stdio: 'ignore' });
  } catch {
    console.error('Error: imagesnap not found.');
    console.error('Install with: brew install imagesnap');
    process.exit(1);
  }
}

function deleteOldScreenshot(path: string): void {
  if (existsSync(path)) {
    try {
      unlinkSync(path);
      // console.log(`Deleted old screenshot: ${path}`);
    } catch (err) {
      console.warn(`Warning: Could not delete old screenshot: ${err}`);
    }
  }
}

function ensureDirectory(path: string): void {
  const dir = dirname(path);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function listDisplays(): void {
  try {
    const output = execSync('imagesnap -l', { encoding: 'utf8' });
    console.log('Available displays:\n', output);
  } catch (err) {
    console.error('Error listing displays:', err);
  }
}

function captureScreenshot(display: number, outputPath: string): string {
  const displayArg = display > 1 ? `-d ${display}` : '';
  const cmd = `imagesnap ${displayArg} "${outputPath}"`;

  try {
    execSync(cmd, { stdio: 'pipe' });
    return outputPath;
  } catch (err) {
    console.error('Error capturing screenshot:');
    if (err instanceof Error) {
      console.error(err.message);
      if (err.message.includes('Permission')) {
        console.error('\nNote: Screen recording permission may be required.');
        console.error('Enable in System Settings > Privacy & Security > Screen Recording');
      }
    }
    process.exit(1);
  }
}

function main() {
  const args = parseArgs();

  // Check prerequisites
  checkImagesnap();

  // List displays
  if (args.listDisplays) {
    listDisplays();
    process.exit(0);
  }

  // Determine output path
  const outputPath = resolve(args.output || SCREENSHOT_PATH);

  // Ensure directory exists
  ensureDirectory(outputPath);

  // Delete old screenshot
  deleteOldScreenshot(outputPath);

  // Capture screenshot
  const display = args.display || DEFAULT_DISPLAY;
  const resultPath = captureScreenshot(display, outputPath);

  // Output result
  console.log(resultPath);
}

main();
