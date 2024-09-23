let express = require('express');
let app = express();
let port = 3000;

let cors = require('cors');

app.use(cors());

//sample data
let cartItems = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];
function cartAdd(cartItems, productId, name, price, quantity) {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].productId != productId) {
      cartItems.push({
        productId: productId,
        name: name,
        price: price,
        quantity: quantity,
      });
      break;
    }
  }
  return cartItems;
}
//Endpoint 1: Add an Item to the Cart
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseInt(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let newItem = cartAdd(cartItems, productId, name, price, quantity);
  res.json(newItem);
});
//Endpoint 2: Edit Quantity of an Item in the Cart
//function
function cartEdit(cartItems, productId, quantity) {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].productId == productId) {
      cartItems[i].quantity = quantity;
    }
  }
  return cartItems;
}
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = req.query.quantity;
  let result = cartEdit(cartItems, productId, quantity);
  res.json(result);
});
//Endpoint 3: Delete an Item from the Cart
function cartDelete(cartItems, productId) {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].productId == productId) {
      cartItems.splice(i, 1);
    }
  }
  return cartItems;
}
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cartDelete(cartItems, productId);
  res.json(result);
});
//Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  res.json(cartItems);
});
//Endpoint 5: Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalQuantity += cartItems[i].quantity;
  }
  res.json(totalQuantity);
});
//Endpoint 6: Calculate Total Price of Items in the Cart
app.get('/cart/total-price', (req, res) => {
  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].price;
  }
  res.json(totalPrice);
});
app.listen(port, () => {
  console.log(`server is started on port ${port}`);
});
