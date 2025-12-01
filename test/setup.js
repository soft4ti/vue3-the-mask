// Setup global test utilities if needed
import { expect, afterEach } from "vitest";
import { cleanup } from "@vue/test-utils";

// Cleanup after each test
afterEach(() => {
  cleanup();
});
