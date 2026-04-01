import { existsSync, rmSync } from "node:fs";
import { spawn } from "node:child_process";

const nextTypesPath = ".next/types";

if (existsSync(nextTypesPath)) {
  rmSync(nextTypesPath, { recursive: true, force: true });
}

const child = spawn("npx", ["tsc", "--noEmit"], {
  stdio: "inherit",
  shell: true
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
