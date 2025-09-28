import { describe, it, expect } from "bun:test"

// Test the truthy function behavior directly
function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

describe("Flag functionality", () => {
  describe("truthy function", () => {
    it("should return true for 'true' value", () => {
      const originalValue = process.env["TEST_FLAG"]
      process.env["TEST_FLAG"] = "true"
      expect(truthy("TEST_FLAG")).toBe(true)
      if (originalValue !== undefined) {
        process.env["TEST_FLAG"] = originalValue
      } else {
        delete process.env["TEST_FLAG"]
      }
    })

    it("should return true for '1' value", () => {
      const originalValue = process.env["TEST_FLAG"]
      process.env["TEST_FLAG"] = "1"
      expect(truthy("TEST_FLAG")).toBe(true)
      if (originalValue !== undefined) {
        process.env["TEST_FLAG"] = originalValue
      } else {
        delete process.env["TEST_FLAG"]
      }
    })

    it("should return false for 'false' value", () => {
      const originalValue = process.env["TEST_FLAG"]
      process.env["TEST_FLAG"] = "false"
      expect(truthy("TEST_FLAG")).toBe(false)
      if (originalValue !== undefined) {
        process.env["TEST_FLAG"] = originalValue
      } else {
        delete process.env["TEST_FLAG"]
      }
    })

    it("should return false for undefined value", () => {
      expect(truthy("NONEXISTENT_FLAG")).toBe(false)
    })

    it("should be case insensitive", () => {
      const originalValue = process.env["TEST_FLAG"]

      process.env["TEST_FLAG"] = "TRUE"
      expect(truthy("TEST_FLAG")).toBe(true)

      process.env["TEST_FLAG"] = "True"
      expect(truthy("TEST_FLAG")).toBe(true)

      if (originalValue !== undefined) {
        process.env["TEST_FLAG"] = originalValue
      } else {
        delete process.env["TEST_FLAG"]
      }
    })

    it("should return false for other string values", () => {
      const originalValue = process.env["TEST_FLAG"]

      process.env["TEST_FLAG"] = "yes"
      expect(truthy("TEST_FLAG")).toBe(false)

      process.env["TEST_FLAG"] = "on"
      expect(truthy("TEST_FLAG")).toBe(false)

      process.env["TEST_FLAG"] = "enabled"
      expect(truthy("TEST_FLAG")).toBe(false)

      if (originalValue !== undefined) {
        process.env["TEST_FLAG"] = originalValue
      } else {
        delete process.env["TEST_FLAG"]
      }
    })
  })

  describe("flag exports", () => {
    it("should export all expected flags", async () => {
      const { Flag } = await import("../../src/flag/flag")

      // Test that all flags exist
      expect(typeof Flag.OPENCODE_AUTO_SHARE).toBe("boolean")
      expect(Flag.OPENCODE_CONFIG === undefined || typeof Flag.OPENCODE_CONFIG === "string").toBe(true)
      expect(Flag.OPENCODE_CONFIG_CONTENT === undefined || typeof Flag.OPENCODE_CONFIG_CONTENT === "string").toBe(true)
      expect(typeof Flag.OPENCODE_DISABLE_AUTOUPDATE).toBe("boolean")
      expect(typeof Flag.OPENCODE_DISABLE_PRUNE).toBe("boolean")
      expect(Flag.OPENCODE_PERMISSION === undefined || typeof Flag.OPENCODE_PERMISSION === "string").toBe(true)
      expect(typeof Flag.OPENCODE_DISABLE_DEFAULT_PLUGINS).toBe("boolean")
      expect(typeof Flag.OPENCODE_DISABLE_LSP_DOWNLOAD).toBe("boolean")
      expect(typeof Flag.OPENCODE_ENABLE_EXPERIMENTAL_MODELS).toBe("boolean")
      expect(typeof Flag.OPENCODE_DISABLE_AUTOCOMPACT).toBe("boolean")
      expect(typeof Flag.OPENCODE_DISABLE_REMINDERS).toBe("boolean")
      expect(typeof Flag.OPENCODE_EXPERIMENTAL_WATCHER).toBe("boolean")
    })
  })
})
