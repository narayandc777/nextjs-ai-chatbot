import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createRequestSession,
  isAbortError,
  shouldSubmitOnEnter,
} from "./chatRequest.ts";

describe("shouldSubmitOnEnter", () => {
  it("submits on Enter when the send control is enabled", () => {
    assert.equal(
      shouldSubmitOnEnter({ key: "Enter", shiftKey: false, repeat: false }, false),
      true,
    );
  });

  it("does not submit Shift+Enter, key repeat, or a disabled send control", () => {
    assert.equal(
      shouldSubmitOnEnter({ key: "Enter", shiftKey: true, repeat: false }, false),
      false,
    );
    assert.equal(
      shouldSubmitOnEnter({ key: "Enter", shiftKey: false, repeat: true }, false),
      false,
    );
    assert.equal(
      shouldSubmitOnEnter({ key: "Enter", shiftKey: false, repeat: false }, true),
      false,
    );
  });
});

describe("createRequestSession", () => {
  it("rejects a second begin while a request is in flight", () => {
    const session = createRequestSession();
    assert.equal(session.begin(), 1);
    assert.equal(session.begin(), null);
  });

  it("allows a new request after the current one ends", () => {
    const session = createRequestSession();
    const first = session.begin();
    assert.equal(first, 1);
    session.end(first!);
    assert.equal(session.begin(), 2);
  });

  it("does not let a stale request clear a newer in-flight request", () => {
    const session = createRequestSession();
    const first = session.begin();
    session.cancel();
    const second = session.begin();

    assert.equal(session.isCurrent(first!), false);
    session.end(first!);
    assert.equal(session.isCurrent(second!), true);
    assert.equal(session.begin(), null);
  });
});

describe("isAbortError", () => {
  it("detects abort errors from fetch cancellation", () => {
    assert.equal(isAbortError(new DOMException("Aborted", "AbortError")), true);
    assert.equal(isAbortError(new Error("network")), false);
  });
});
