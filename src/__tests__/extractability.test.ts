import { test } from "bun:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { assertSeam } from "@bounded-systems/seam-check";

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// The credential capability: the one place service credentials are resolved.
// Prod files import only @bounded-systems/env (the sanctioned env reader) — no
// raw process.env, no spawn; auth authority flows through env. The harness now
// also enforces that no-ambient intent (the old test only checked imports).
test("@bounded-systems/auth upholds its seam claim", () => {
  assertSeam({
    root: SRC,
    prod: ["@bounded-systems/env"],
    test: ["@bounded-systems/auth", "@bounded-systems/seam-check", "node:fs"],
  });
});
