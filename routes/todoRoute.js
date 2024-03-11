const express = require("express");
const Todo = require("../models/todoModel");

const router = express.Router();

router.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  try {
    const todo = await Todo.create({
      title,
      description,
    });
    res.status(200).json(todo);
  } catch (error) {
    return res.json("Internal server error", error);
  }
});

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found." });
    }
    res.status(200).json({ success: 1, todo });
  } catch (error) {
    res.status(500).json("Internal server error", error);
  }
});

module.exports = router;
