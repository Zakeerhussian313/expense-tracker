import { describe, expect, it } from "vitest";
import { validateExpenseInput } from "./expenseValidation.js";

describe("validateExpenseInput", () => {
  it("rejects an empty or whitespace-only title", () => {
    expect(validateExpenseInput("  ", "10").error).toBe(
      "Please enter an expense title."
    );
  });

  it.each(["", "abc", "0x10", "Infinity"])(
    "rejects a non-numeric or empty amount: %s",
    (amount) => {
      expect(validateExpenseInput("Lunch", amount).error).toBe(
        "Please enter a valid amount."
      );
    }
  );

  it.each(["0", "-1"])("rejects a non-positive amount: %s", (amount) => {
    expect(validateExpenseInput("Lunch", amount).error).toBe(
      "Amount must be greater than zero."
    );
  });

  it("rejects amounts greater than 100,000", () => {
    expect(validateExpenseInput("Lunch", "100000.01").error).toBe(
      "Amount cannot exceed 100000."
    );
  });

  it("accepts positive amounts up to and including 100,000", () => {
    expect(validateExpenseInput(" Lunch ", "100000")).toEqual({
      cleanTitle: "Lunch",
      numericAmount: 100000,
    });
  });
});
