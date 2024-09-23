let express = require('express');
let app = express();
let port = 3000;

//sample data
let products = [
  { productId: 1, name: 'Laptop', inStock: true },
  { productId: 2, name: 'Phone', inStock: true },
  { productId: 3, name: 'Tablet', inStock: false },
];

let employees = [
  { employeeId: 1, name: 'Alice', active: true },
  { employeeId: 2, name: 'Bob', active: true },
  { employeeId: 3, name: 'Charlie', active: false },
];

//sample data

let orders = [
  { orderId: 1, product: 'Laptop', delivered: false },
  { orderId: 2, product: 'Phone', delivered: true },
  { orderId: 3, product: 'Tablet', delivered: false },
];

//Sample data:

let reservations = [
  { reservationId: 1, name: 'John', confirmed: false },
  { reservationId: 2, name: 'Jane', confirmed: true },
  { reservationId: 3, name: 'Jack', confirmed: false },
];

//sample data

let subscriptions = [
  { subscriptionId: 1, service: 'Netflix', active: false },
  { subscriptionId: 2, service: 'Spotify', active: true },
  { subscriptionId: 3, service: 'Amazon Prime', active: false },
];
//Example 1: Remove Out of Stock Products
//function
function removeOutOfStockProducts(products) {
  return products.filter((product) => product.inStock);
}
// Example 1: Remove Out of Stock Products
app.get('/products/remove-out-of-stock', (req, res) => {
  let result = removeOutOfStockProducts(products);
  products = result; //update product list
  res.json(result);
});
//Example 2: Update Employee Active Status by ID
//function
function updateEmployeeStatusById(employees, employeeId, active) {
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].employeeId === employeeId) {
      employees[i].active = active;
      break;
    }
  }
  return employees;
}
app.get('/employees/update', (req, res) => {
  let employeeId = parseInt(req.query.employeeId);
  let active = req.query.active === 'true';
  let result = updateEmployeeStatusById(employees, employeeId, active);
  res.json(result);
});
//Example 3: Update Order Delivery Status by ID
function updateOrderStatusById(orders, orderId, delivered) {
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].orderId === orderId) {
      orders[i].delivered = delivered;
      break;
    }
  }
  return orders;
}
app.get('/orders/update', (req, res) => {
  let orderId = parseInt(req.query.orderId);
  let delivered = req.query.delivered === 'true';
  let result = updateOrderStatusById(orders, orderId, delivered);
  res.json(result);
});

//Example 4: Remove Unconfirmed Reservations
//function
function removeUnconfirmedReservations(reservations) {
  return reservations.filter((reservation) => reservation.confirmed);
}
app.get('/reservations/remove-unconfirmed', (req, res) => {
  let result = removeUnconfirmedReservations(reservations);
  reservations = result; //update reservation list
  res.json(result);
});
//Example 5: Update Subscription Status by ID
//function
function updateSubscriptionStatusById(subscriptions, subscriptionId, active) {
  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].subscriptionId === subscriptionId) {
      subscriptions[i].active = active;
      break;
    }
  }
  return subscriptions;
}
app.get('/subscriptions/update', (req, res) => {
  let subscriptionId = parseInt(req.query.subscriptionId);
  let active = req.query.active === 'true';
  let result = updateSubscriptionStatusById(
    subscriptions,
    subscriptionId,
    active
  );
  res.json(result);
});
app.listen(port, () => {
  console.log(`server is started on port ${port}`);
});
