import { Order } from "@/lib/store/useOrderStore";

const arrayToCSV = (data: any[], headers: string[]) => {
  const csvRows = [];
  csvRows.push(headers.join(","));

  for (const row of data) {
    const values = headers.map((header) => {
      const value = row[header];
      return typeof value === "string"
        ? `"${value.replace(/"/g, '""')}"`
        : value;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
};

export const exportAsCSV = (
  orders: Order[],
  startDate: Date,
  endDate: Date,
) => {
  const headers = [
    "Order ID",
    "User Name",
    "Restaurant Name",
    "Item Details",
    "Total Price",
    "Status",
    "Created At",
    "Updated At",
  ];

  const data = orders
    .filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    })
    .map((order) => {
      const itemDetails = order.items
        .map((item: any) => {
          return item.items
            .map((i: any) => {
              const modifiers = i.modifiers
                .map((mod: any) => mod.name)
                .join(", ");
              return `${i.name} (Qty: ${i.quantity}, Modifiers: ${modifiers})`;
            })
            .join(" | ");
        })
        .join(" | ");

      const restaurantNames = order.items
        .map((item: any) => item.restaurant.name)
        .join(" | ");

      return {
        "Order ID": order._id,
        "User Name": order.user.name,
        "Restaurant Name": restaurantNames,
        "Item Details": itemDetails,
        "Total Price": order.totalPrice,
        Status: order.status,
        "Created At": order.createdAt,
        "Updated At": order.updatedAt,
      };
    });

  const csvContent = arrayToCSV(data, headers);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "orders.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
