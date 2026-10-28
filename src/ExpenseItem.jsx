import "./ExpenseItem.css";

// Receives one expense and its delete callback; renders that expense's details and action.
function ExpenseItem({ expense, onDelete }) {
  return (
    <li className="expense-item" data-cy="expense-item">
      <div className="expense-details">
        <strong>{expense.title}</strong>
        <span>{expense.category}</span>
      </div>
      <div className="expense-actions">
        <strong>₹{Number(expense.amount).toFixed(2)}</strong>
        <button
          type="button"
          className="delete-button"
          data-cy="delete-expense"
          aria-label={`Delete ${expense.title}`}
          onClick={() => onDelete(expense.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default ExpenseItem;
