export function shouldSubmitOnEnter(
  event: { key: string; shiftKey: boolean; repeat: boolean },
  disabled: boolean,
): boolean {
  return event.key === "Enter" && !event.shiftKey && !event.repeat && !disabled;
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException
    ? error.name === "AbortError"
    : error instanceof Error && error.name === "AbortError";
}

export function createRequestSession() {
  let activeId = 0;
  let inFlight = false;

  return {
    begin(): number | null {
      if (inFlight) return null;
      inFlight = true;
      return ++activeId;
    },
    cancel() {
      activeId += 1;
      inFlight = false;
    },
    isCurrent(id: number) {
      return id === activeId;
    },
    end(id: number) {
      if (id === activeId) inFlight = false;
    },
  };
}
