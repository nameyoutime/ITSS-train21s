const mongoose = require("mongoose");
const express = require("express");
const app = express();
const taskSchema = require("../schemas/task.schemas");
const body = require("body-parser");
app.use(body.json());
const Database = require("./database");
const db = new Database();

const Task = mongoose.model("tasks", taskSchema);

app.get("/tasks", async (req, res) => {
  let result = await Task.find();
  res.send({
    items: result,
  });
});

app.post("/createTasks", (req, res) => {
  let { name, content } = req.body;
  const task1 = new Task({
    name: name,
    content: content,
    createDate: Date.now(),
    deadLine: Date.now() + 1000 * 60 * 60 * 24,
  });

  db.createTask(task1);
  res.send(`item ${name} was created`);
});

app.delete("/delete", async (req, res) => {
  const { name } = req.query;
  try {
    await Task.findOneAndRemove(name);
    res.send(`destroy ${name}`);
  }catch(e){
      res.send({
          message: `can't delete ${name}`
      })
  }
});

app.put("/update",async(req,res)=>{
    const{name}=req.query;

    Task.findOneAndUpdate(name,{
        content:"hello"
    })

    res.send(`update ${name}`)
})

module.exports = app;
