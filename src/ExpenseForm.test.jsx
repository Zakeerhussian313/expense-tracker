// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ExpenseForm from "./ExpenseForm.jsx";

afterEach(cleanup);

describe("ExpenseForm", () => {
  it("submits a valid expense", () => {
    const onAddExpense = vi.fn();
    render(<ExpenseForm onAddExpense={onAddExpense} />);

    fireEvent.change(screen.getByLabelText("Expense title"), {
      target: { value: "  Lunch  " },
    });
    fireEvent.change(screen.getByLabelText("Amount (₹)"), {
      target: { value: "250" },
    });
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "Food" },
    });
    fireEvent.click(screen.getByRole("button", { name: "+ Add Expense" }));

    expect(onAddExpense).toHaveBeenCalledWith({
      title: "Lunch",
      amount: 250,
      category: "Food",
    });
    expect(screen.getByLabelText("Expense title").value).toBe("");
    expect(screen.getByLabelText("Amount (₹)").value).toBe("");
  });

  it("shows an error and does not submit when the title is empty", () => {
    const onAddExpense = vi.fn();
    render(<ExpenseForm onAddExpense={onAddExpense} />);

    fireEvent.change(screen.getByLabelText("Amount (₹)"), {
      target: { value: "250" },
    });
    fireEvent.click(screen.getByRole("button", { name: "+ Add Expense" }));

    expect(screen.getByRole("alert").textContent).toBe(
      "Please enter an expense title."
    );
    expect(onAddExpense).not.toHaveBeenCalled();
  });
});
