#!/usr/bin/env -S bun
/**
 * Smart Git Commit - Create well-formatted conventional commits with emoji
 *
 * Usage:
 *   bun scripts/commit.ts [message]
 *   bun scripts/commit.ts --no-verify
 *   bun scripts/commit.ts --amend
 */

const { exit } = process;
const exec = async (cmd: string): Promise<string> => {
  const proc = Bun.spawn(["sh", "-c", cmd], {
    stdout: "pipe",
    stderr: "pipe",
  });
  const text = await new Response(proc.stdout).text();
  await proc.exited;
  return text.trim();
};

interface CommitType {
  type: string;
  emoji: string;
  description: string;
}

const COMMIT_TYPES: CommitType[] = [
  { type: "feat", emoji: "✨", description: "New feature" },
  { type: "fix", emoji: "🐛", description: "Bug fix" },
  { type: "docs", emoji: "📝", description: "Documentation" },
  { type: "style", emoji: "💄", description: "Formatting/style" },
  { type: "refactor", emoji: "♻️", description: "Code refactoring" },
  { type: "perf", emoji: "⚡️", description: "Performance improvements" },
  { type: "test", emoji: "✅", description: "Tests" },
  { type: "chore", emoji: "🔧", description: "Tooling, configuration" },
  { type: "ci", emoji: "🚀", description: "CI/CD improvements" },
  { type: "revert", emoji: "⏪️", description: "Revert changes" },
];

async function getGitStatus(): Promise<{
  staged: string[];
  unstaged: string[];
  branch: string;
}> {
  const staged = (await exec("git diff --cached --name-only"))
    .split("\n")
    .filter(Boolean);
  const unstaged = (await exec("git diff --name-only"))
    .split("\n")
    .filter(Boolean);
  const branch = await exec("git branch --show-current");
  return { staged, unstaged, branch };
}

async function getDiff(cached = false): Promise<string> {
  const flag = cached ? "--cached" : "";
  return await exec(`git diff ${flag} --unified=3`);
}

async function runPreCommitChecks(): Promise<boolean> {
  console.log("🔍 Running pre-commit checks...\n");

  const checks = [
    { name: "lint", cmd: "pnpm lint" },
    { name: "build", cmd: "pnpm build" },
    { name: "generate:docs", cmd: "pnpm generate:docs" },
  ];

  for (const check of checks) {
    try {
      console.log(`  Running ${check.name}...`);
      const proc = Bun.spawn(["sh", "-c", check.cmd], {
        stdout: "inherit",
        stderr: "inherit",
      });
      const code = await proc.exited;
      if (code !== 0) throw new Error(`Failed with code ${code}`);
      console.log(`  ✅ ${check.name} passed\n`);
    } catch (error) {
      console.log(`  ❌ ${check.name} failed`);
      console.log(`\n⚠️  Pre-commit checks failed.`);
      console.log(`Do you want to proceed anyway? (y/N): `);

      const proceed = await Promise.race([
        new Promise<boolean>((resolve) => {
          process.stdin.setRawMode(true);
          process.stdin.once("data", (data) => {
            process.stdin.setRawMode(false);
            process.stdin.pause();
            resolve(data.toString().toLowerCase() === "y");
          });
        }),
        new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 30000)),
      ]);

      if (!proceed) {
        console.log("\n🚫 Commit aborted. Fix the issues and try again.");
        exit(1);
      }
      console.log("\n⚠️  Proceeding despite failed checks...\n");
      return true;
    }
  }

  console.log("✅ All pre-commit checks passed!\n");
  return true;
}

function analyzeChanges(diff: string): {
  hasFeature: boolean;
  hasFix: boolean;
  hasDocs: boolean;
  hasRefactor: boolean;
  hasStyle: boolean;
  files: { source: string; test: string; docs: string; config: string };
} {
  const lines = diff.split("\n");
  const result = {
    hasFeature: false,
    hasFix: false,
    hasDocs: false,
    hasRefactor: false,
    hasStyle: false,
    files: { source: "", test: "", docs: "", config: "" },
  };

  for (const line of lines) {
    if (line.startsWith("+++")) {
      const file = line.substring(4).replace("b/", "");
      if (file.includes("test") || file.includes(".spec.")) {
        result.files.test += file + " ";
      } else if (file.includes(".md") || file.includes("docs/")) {
        result.files.docs += file + " ";
      } else if (file.includes("config") || file.includes(".json")) {
        result.files.config += file + " ";
      } else {
        result.files.source += file + " ";
      }
    }
    if (line.startsWith("+") && !line.startsWith("+++")) {
      const content = line.substring(1);
      if (content.includes("export") || content.includes("function") || content.includes("class")) {
        result.hasFeature = true;
      }
      if (content.includes("fix") || content.includes("bug") || content.includes("error")) {
        result.hasFix = true;
      }
      if (content.includes("// TODO") || content.includes("// FIXME")) {
        result.hasRefactor = true;
      }
    }
  }

  return result;
}

function generateCommitMessage(analysis: ReturnType<typeof analyzeChanges>, customMessage?: string): string {
  let type = "chore";
  let description = customMessage || "update code";

  if (analysis.hasFix) type = "fix";
  else if (analysis.hasFeature) type = "feat";
  else if (analysis.files.docs && !analysis.files.source) type = "docs";
  else if (analysis.files.config && !analysis.files.source) type = "chore";
  else if (analysis.hasRefactor) type = "refactor";

  const commitType = COMMIT_TYPES.find((t) => t.type === type) || COMMIT_TYPES[7];

  if (!customMessage && analysis.files.source) {
    const mainFiles = analysis.files.source.split(" ").filter(Boolean).slice(0, 2);
    const fileNames = mainFiles.map((f) => f.split("/").pop()?.replace(/\.(ts|js|tsx|jsx)$/, "")).join(", ");
    description = type === "fix" ? `fix issues in ${fileNames}` : `update ${fileNames}`;
  }

  return `${commitType.emoji} ${type}: ${description}`;
}

async function main() {
  const args = process.argv.slice(2);
  const noVerify = args.includes("--no-verify");
  const amend = args.includes("--amend");
  const customMessage = args.find((a) => !a.startsWith("--"));

  // Run pre-commit checks unless --no-verify is specified
  if (!noVerify && !amend) {
    await runPreCommitChecks();
  }

  // Get current git status
  const { staged, unstaged, branch } = await getGitStatus();

  console.log(`📂 Current branch: ${branch}`);
  console.log(`📋 Staged files: ${staged.length || "(none)"}`);
  console.log(`📝 Unstaged files: ${unstaged.length || "(none)"}\n`);

  // Auto-stage if nothing is staged
  if (staged.length === 0 && unstaged.length > 0) {
    console.log("🔧 No files staged. Auto-staging all changes...\n");
    await exec("git add -A");
    const updated = await getGitStatus();
    updated.staged.forEach((f) => console.log(`  + ${f}`));
    console.log();
  }

  if (staged.length === 0 && unstaged.length === 0) {
    console.log("✅ No changes to commit.");
    exit(0);
  }

  // Get diff and analyze
  const diff = await getDiff(true);
  const analysis = analyzeChanges(diff);

  // Generate commit message
  const message = generateCommitMessage(analysis, customMessage);

  console.log(`📝 Commit message:\n\n  ${message}\n`);

  // Show staged files
  console.log("📦 Files to be committed:");
  const currentStaged = (await exec("git diff --cached --name-only"))
    .split("\n")
    .filter(Boolean);
  currentStaged.forEach((f) => console.log(`  ${f}`));
  console.log();

  // Execute commit
  const amendFlag = amend ? "--amend" : "";
  const cmd = `git commit ${amendFlag} -m "$(cat <<'EOF'
${message}
EOF
)"`;

  console.log("⏳ Creating commit...\n");
  const proc = Bun.spawn(["sh", "-c", cmd], {
    stdout: "inherit",
    stderr: "inherit",
  });
  const code = await proc.exited;

  if (code === 0) {
    console.log("\n✅ Commit created successfully!");
  } else {
    console.log("\n❌ Commit failed.");
    exit(code);
  }
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  exit(1);
});
