import assert from "node:assert/strict"
import test from "node:test"
import { mergeSessionStatusSnapshot } from "./session-status-hydration.ts"
import type { SessionStatus } from "./sdk.ts"

test("hydrates current status without overwriting a newer SSE event", () => {
  const oldBusy: SessionStatus = { type: "busy" }
  const baseline = { stale: oldBusy, changed: oldBusy }
  const current = { ...baseline, changed: { type: "idle" } as SessionStatus }

  assert.deepEqual(
    mergeSessionStatusSnapshot(current, baseline, { stale: { type: "busy" }, changed: { type: "busy" } }, [
      "stale",
      "changed",
      "missing",
    ]),
    {
      stale: { type: "busy" },
      changed: { type: "idle" },
      missing: { type: "idle" },
    },
  )
})
