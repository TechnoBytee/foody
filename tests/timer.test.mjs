import { test } from "node:test";
import assert from "node:assert/strict";
import { formatTimer } from "../src/lib/timer.ts";

test("formats minutes and seconds", () => {
  assert.equal(formatTimer(0), "00:00");
  assert.equal(formatTimer(65), "01:05");
  assert.equal(formatTimer(600), "10:00");
  assert.equal(formatTimer(-3), "00:00");
});
