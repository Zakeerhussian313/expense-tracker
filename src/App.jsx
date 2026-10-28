
import { useState } from "react";
import "./App.css";
import ExpenseForm from "./ExpenseForm.jsx";
import { EXPENSE_CATEGORIES } from "./expenseCategories.js";

// App manages expenses and the currently selected filter.
function App() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");

  function addExpense(expense) {
    const newExpense = {
      id: crypto.randomUUID(),
      ...expense,
    };

    setExpenses((current) => [...current, newExpense]);
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

        <ExpenseForm onAddExpense={addExpense} />
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
            {EXPENSE_CATEGORIES.map((item) => (
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
