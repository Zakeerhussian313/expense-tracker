
import { useState } from "react";
import "./App.css";

const categories = ["Food", "Travel", "Bills", "Other"];

// App manages the expenses and the currently selected category.
function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  function addExpense(e) {
    e.preventDefault();

    const cleanTitle = title.trim();
    const numericAmount = Number(amount);

    if (!cleanTitle) {
      setError("Please enter an expense title.");
      return;
    }

    if (amount.trim() === "" || !Number.isFinite(numericAmount)) {
      setError("Please enter a valid amount.");
      return;
    }

    if (numericAmount <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    if (numericAmount > 100000) {
      setError("Amount cannot exceed 100000.");
      return;
    }

    const newExpense = {
      id: crypto.randomUUID(),
      title: cleanTitle,
      amount: numericAmount,
      category,
    };

    setExpenses((current) => [...current, newExpense]);
    setTitle("");
    setAmount("");
    setCategory("Food");
    setError("");
  }

  function deleteExpense(id) {
    setExpenses((current) =>
      current.filter((expense) => expense.id !== id)
    );
  }

  const visibleExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === filter);

  const total = visibleExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <main className="app">
      <header className="header">
        <p className="eyebrow">PERSONAL FINANCE</p>
        <h1>Expense Tracker</h1>
        <p>Keep track of where your money goes.</p>
      </header>

      <section className="card">
        <h2>Add an expense</h2>

        <form onSubmit={addExpense}>
          <label htmlFor="title">Expense title</label>
          <input
            id="title"
            data-cy="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 250"
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            data-cy="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {error && <p className="error" role="alert">{error}</p>}

          <button type="submit" data-cy="add-expense">
            + Add Expense
          </button>
        </form>
      </section>

      <section className="summary">
        <div className="summary-card">
          <p>Total expenses</p>
          <h2 data-cy="total">
            ₹{total.toFixed(2)}
          </h2>
        </div>

        <div className="summary-card">
          <p>Expenses displayed</p>
          <h2 data-cy="count">{visibleExpenses.length}</h2>
        </div>
      </section>

      <section className="card">
        <div className="list-header">
          <h2>Your expenses</h2>

          <select
            aria-label="Filter expenses by category"
            data-cy="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {visibleExpenses.length === 0 ? (
          <p className="empty">No expenses to display yet.</p>
        ) : (
          <ul className="expense-list">
            {visibleExpenses.map((expense) => (
              <li
                className="expense-item"
                data-cy="expense-item"
                key={expense.id}
              >
                <div className="expense-details">
                  <strong>{expense.title}</strong>
                  <span>{expense.category}</span>
                </div>

                <div className="expense-actions">
                  <strong>₹{expense.amount.toFixed(2)}</strong>
                  <button
                    type="button"
                    className="delete-button"
                    data-cy="delete-expense"
                    aria-label={`Delete ${expense.title}`}
                    onClick={() => deleteExpense(expense.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer>Spend wisely. Save consistently.</footer>
    </main>
  );
}

export default App;
