const express = require('express');

const app = express();

// configure express to accept JSON 
app.use(express.json());

const items = require('./fakeDb');

//check the root

app.get('/', (req, res) => {
    return res.json("Shopping List");
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
    console.log("Creating an item. Data: ", req.body);

    //we get the item 'name' and item 'price'
    const { name, price } = req.body;

    //create item object
    const newItem = { name, price }

    //prevent repeating item names, make them unique
    for (const item of items) {
        if (item.name.toLowerCase() === name.toLowerCase()) {
            return res.status(400).json({
                message: `Did not create. Item name ${name} already exists`
            });
        }
    }

    //push into items
    items.push(newItem);
    console.log("Items updated", items);
    return res.json({ added: newItem });

})

// GET /items/:name
// name could equal anything 'laptop', 'milk', etc.
app.get('/items/:name', (req, res) => {
    console.log("GET /items/:name route");
    console.log(req.params.name);
    // get the item name from the URL params
    const item = req.params.name;
    // check if the item is in the shopping list, make generic not on list message if not

    // if it does exist, display the name and price from the items array in the fakeDb


})

app.listen(4000, () => {
    console.log("Server running on port 4000")
});