const express = require('express');

const app = express();

// configure express to accept JSON 
app.use(express.json());

const items = require('./fakeDb');

//the root displays Shopping List

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
                message: `Did not create. Item name ${name} already exists.`
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
    // get the item name from the URL params
    const { name } = req.params;

    // check if the item is in the shopping list, if not make generic not found message
    // if it does exist, display the name and price from the items array in the fakeDb
    const foundItems = [];

    for (const item of items) {
        if (item.name.toLowerCase() === name.toLowerCase()) {
            foundItems.push(item);
        }
    }

    if (foundItems.length === 0) {
        return res.status(404).json({
            message: `Item ${name} not found.`
        });
    }

    return res.json({
        message: "Found item",
        items: foundItems
    });
});

// PATCH /items/:name
// modify the price of a specific item
app.patch('/items/:name', (req, res) => {
    //1. check if item exists
    //2. get the price
    //3. update the price, send back updated item
    const { name } = req.params;
    const { price } = req.body;

    if (!name | !price) {
        return res.status(400).json({
            message: "Error missing either {name} param or {price} field."
        });
    }

    let itemFound = false;
    for (const item of items) {
        if (item.name.toLowerCase() === name.toLowerCase()) {
            itemFound = true;
            break;
        }
    }

    //check flag
    if (!itemFound) {
        return res.status(404).json({
            message: `Item ${name} not found. Cannot update.`
        });
    }

    let updatedItem = null;
    for (const item of items) {
        if (item.name.toLowerCase() === name.toLowerCase()) {
            item.price = price;
            updatedItem = item;
        }
    }

    return res.status(200).json({
        message: `Item ${updatedItem.name} updated.`,
        updatedItem
    });
})



//DELETE /items/:name
//delete a specific item from an array
app.delete('/items/:name', (req, res) => {
    //1. check if item exists
    //2. delete from array
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({
            message: "Error missing {name} param."
        });
    }

    let itemFound = false;
    for (const item of items) {
        if (item.name.toLowerCase() === name.toLowerCase()) {
            itemFound = true;
            break;
        }
    }

    //check flag
    if (!itemFound) {
        return res.status(404).json({
            message: `Item ${name} not found. Nothing to delete.`
        });
    }

    let itemToDelete = null;
    for (const item of items) {
        if (item.name.toLowerCase() === name.toLowerCase()) {
            itemToDelete = item;
            console.log(itemToDelete);
        }
    }

    const index = items.indexOf(itemToDelete);
    if (index !== -1) {
        items.splice(index, 1)
    }

    return res.status(200).json({
        message: `Item ${itemToDelete.name} deleted.`
    });

})


app.listen(4000, () => {
    console.log("Server running on port 4000")
});
