import { describe, test } from "node:test";
import * as assert from "node:assert/strict";
import { RvvupClient } from "./client";

test("smoke test", () => {
  const rvvup = new RvvupClient(process.env.TEST_RVVUP_API_KEY!);

  assert.ok(rvvup);
});
