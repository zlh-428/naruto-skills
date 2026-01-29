#!/usr/bin/env -S bun

import { execSync } from 'child_process';
import { resolve } from 'path';

const SCREENSHOT_DIR = resolve(process.env.HOME || '', '.peekaboo-skill');
const DEFAULT_CLEANUP_HOURS = 24;

interface Args {
  olderThan?: number;
  all?: boolean;
  dryRun?: boolean;
  help?: boolean;
}

function parseArgs(): Args {
  const args: Args = {};
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    switch (arg) {
      case '--older-than':
        args.olderThan = parseInt(process.argv[++i]);
        break;
      case '--all':
        args.all = true;
        break;
      case '--dry-run':
        args.dryRun = true;
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
  console.log('Screenshot Cleanup - Clean old screenshots via Peekaboo\n');
  console.log('Usage:');
  console.log('  npx bun clean.ts [options]\n');
  console.log('Options:');
  console.log('      --older-than <hours>  Delete screenshots older than N hours (default: 24)');
  console.log('      --all               Delete all screenshots');
  console.log('      --dry-run           Preview what would be deleted');
  console.log('  -h, --help              Show this help\n');
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

function cleanupScreenshots(args: Args): void {
  let cmd = 'peekaboo clean';
  
  if (args.all) {
    cmd += ' --all-snapshots';
  } else if (args.olderThan !== undefined) {
    cmd += ' --older-than ' + args.olderThan;
  } else {
    cmd += ' --older-than ' + DEFAULT_CLEANUP_HOURS;
  }
  
  if (args.dryRun) {
    cmd += ' --dry-run';
  }
  
  try {
    execSync(cmd, { stdio: 'pipe' });
  } catch (err) {
    console.error('Error cleaning screenshots:');
    if (err instanceof Error) {
      console.error(err.message);
    }
    process.exit(1);
  }
}

function main() {
  const args = parseArgs();
  
  if (args.help) {
    showHelp();
    process.exit(0);
  }
  
  checkPeekaboo();
  cleanupScreenshots(args);
}

main();
