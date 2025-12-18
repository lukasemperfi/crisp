export class TableModel {
  #rows = [];

  constructor(initialRows) {
    this.setRows(initialRows);
  }

  setRows(newRows) {
    this.#rows = [...newRows];
  }

  getRows() {
    return [...this.#rows];
  }

  static calculateRowTotal(quantity, price) {
    const q = parseFloat(quantity);
    const p = parseFloat(price);

    if (isNaN(q) || isNaN(p) || q < 0 || p < 0) {
      console.error("Некорректные данные для расчета суммы строки.");
      return 0;
    }

    return q * p;
  }

  calculateTotalAmount() {
    const total = this.#rows.reduce((sum, row) => {
      const rowTotal = parseFloat(row.total) || 0;
      return sum + rowTotal;
    }, 0);

    return Math.round(total * 100) / 100;
  }

  updateQuantity(itemId, newQuantity) {
    const newRows = this.#rows.map((row) => {
      if (row.id === itemId) {
        const newTotal = TableModel.calculateRowTotal(newQuantity, row.price);

        return {
          ...row,
          quantity: newQuantity,
          total: newTotal,
        };
      }
      return row;
    });

    this.setRows(newRows);

    return newRows;
  }
}
