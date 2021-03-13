const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const connectionString =
  "mongodb+srv://admin:admin@cluster0.yhduf.mongodb.net/tododb?retryWrites=true&w=majority";

let Task;
let taskSchema;
/**
 *
 *
 * @returns {Promise<mongoose.Connection>}
 */
async function connectToDb() {
  return new Promise((resolve, reject) => {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", (err) => {
      reject(err);
    });

    db.once("open", () => {
      console.log("connect successfully");
      resolve(db);
    });
  });
}

app.get("/tasks", async (req, res) => {
  let result = await Task.find({});
  res.send({
    tasks: result,
  });
});

// app.post("/createItem", async (req, res) => {
//   const { name, content, createDate, deadLine, status } = req.body;

//   const Task1 = new Task({
//     name: name,
//     content: content,
//     createDate: createDate,
//     deadLine: deadLine,
//     status: status,
//   });

//   await Task1.save();

//   res.send(console.log(`create [${name}])`))
// });

async function main() {
  try {
    await connectToDb();
    app.listen("8080", "0.0.0.0", () => {
      console.log("server is running");
    });

    taskSchema = new mongoose.Schema({
      name: String,
      content: String,
      createDate: Number,
      deadLine: Number,
      status: String,
    });

    Task = mongoose.model("Task", taskSchema);

    let result = await Task.findOne({
      name: "Đi chợ",
    });
    console.log(result);

    // const Task1 = new Task({
    //   name: "Đi chợ",
    //   content: "Mua đồ ăn",
    //   createDate: Date.now(),
    //   deadLine: Date.now() + 1000 * 60 * 60,
    //   status: "Todo",
    // });

    // await Task1.save();
  } catch (err) {
    console.error(err);
  }
}
main();
