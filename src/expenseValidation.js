export function validateExpenseInput(title, amount) {
  const cleanTitle = title.trim();
  const amountText = amount.trim();
  const numericAmount = Number(amountText);

  if (!cleanTitle) {
    return { error: "Please enter an expense title." };
  }

  if (
    !/^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(amountText) ||
    !Number.isFinite(numericAmount)
  ) {
    return { error: "Please enter a valid amount." };
  }

  if (numericAmount <= 0) {
    return { error: "Amount must be greater than zero." };
  }

  if (numericAmount > 100000) {
    return { error: "Amount cannot exceed 100000." };
  }

  return { cleanTitle, numericAmount };
}
