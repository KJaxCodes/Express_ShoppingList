const express = require('express');

const app = express();

//show JSON 
app.use(express.json());

const items = require('./fakeDb');

//check the root

app.get('/', (req, res) => {
    return res.send("Shopping List");
})

// GET /items
app.get('/items', (req, res) => {
    console.log("GET /items route");
    //if array is empty, display empty message
    if (items.length === 0) return res.json({ message: "Cart is empty" });
    return res.json(items);
});

// POST /items
app.post('/items', (req, res) => {
    console.log("POST /items route");
    const { name, price } = req.body;
    const newItem = req.body;
    items.push(newItem);
    return res.json({ added: newItem });
})

// GET /items/:name
app.get('/items/:name', (req, res) => {
    console.log("GET /items/:name route");
    console.log(req.params.name);
    // get the item name entered
    const item = req.params.name;
    // check if the item is in the shopping list, make generic not on list message if not

    // if it does exist, display the name and price from the items array in the fakeDb


})

app.listen(4000, () => {
    console.log("Server running on port 4000")
});