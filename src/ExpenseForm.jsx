import React, { useState } from "react";
import "./ExpenseForm.css";
import { EXPENSE_CATEGORIES } from "./expenseCategories.js";
import { validateExpenseInput } from "./expenseValidation.js";

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const validation = validateExpenseInput(title, amount);
    if (validation.error) {
      setError(validation.error);
      return;
    }

    onAddExpense({
      title: validation.cleanTitle,
      amount: validation.numericAmount,
      category,
    });
    setTitle("");
    setAmount("");
    setCategory("Food");
    setError("");
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Expense title</label>
      <input
        id="title"
        data-cy="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="e.g. Lunch"
      />

      <label htmlFor="amount">Amount (₹)</label>
      <input
        id="amount"
        data-cy="amount"
        type="number"
        min="0.01"
        max="100000"
        step="any"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        placeholder="e.g. 250"
      />

      <label htmlFor="category">Category</label>
      <select
        id="category"
        data-cy="category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        {EXPENSE_CATEGORIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" data-cy="add-expense">
        + Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;
