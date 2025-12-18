export function mapOrdersToRows(orders) {
  return orders.map((order) => {
    const orderDate = new Date(order.created_at);
    const date = orderDate.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return {
      id: order.id,
      orderNumber: order.order_number,
      date,
      itemsCount: order.order_items.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),
      status: order.status,
      total: order.total_amount,
    };
  });
}
