import ExpenseItem from "./ExpenseItem.jsx";
import "./ExpenseList.css";

// Receives the visible expenses and delete callback; renders the list or its empty state.
function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p className="empty">No expenses to display yet.</p>;
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default ExpenseList;
