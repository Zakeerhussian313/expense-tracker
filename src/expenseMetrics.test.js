import assert from "node:assert/strict";
import test from "node:test";
import {
  getExpenseCount,
  getExpenseTotal,
  removeExpenseById,
} from "./expenseMetrics.js";

const expenses = [
  { id: "1", title: "Lunch", amount: 12.5 },
  { id: "2", title: "Bus", amount: 3.25 },
];

test("deleting an expense updates the remaining expenses, total, and count", () => {
  const remaining = removeExpenseById(expenses, "1");

  assert.deepEqual(remaining, [expenses[1]]);
  assert.equal(getExpenseTotal(remaining), 3.25);
  assert.equal(getExpenseCount(remaining), 1);
});

test("total sums amounts and count reports visible expenses", () => {
  assert.equal(getExpenseTotal(expenses), 15.75);
  assert.equal(getExpenseCount(expenses), 2);
});
