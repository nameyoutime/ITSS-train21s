const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const Database = require("./database");
const Item = require("./models/item.model");
const db = new Database();

app.use(bodyParser.json());
app.get("/items", (req, res) => {
  console.log("use id");
  let { id } = req.query;
  if (id != undefined) {
    res.send({
      items: db.getItemById(id),
    });
    return;
  }

  res.send({
    items: db.getAllItem(),
  });
});
app.post("/items", async (req, res) => {
  const { id, name, price, inStock } = req.body;
  try {
    await db.createItem(new Item(id, name, price, inStock));
    res.send({
      messege: `Item  [${id}]was created`,
    });
  } catch (err) {
    res.status(400).send({
      messege: "invalid item",
    });
  }
});


module.exports = app;
