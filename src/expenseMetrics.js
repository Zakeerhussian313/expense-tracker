export function removeExpenseById(expenses, id) {
  return expenses.filter((expense) => expense.id !== id);
}

export function getExpenseTotal(expenses) {
  return expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
}

export function getExpenseCount(expenses) {
  return expenses.length;
}
