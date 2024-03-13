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

router.delete("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found." });
    }
    res.status(200).json({ message: "Todo deleted successfully", todo });
  } catch (error) {
    res.status(500).json("Internal Server Error", error);
  }
});

router.put("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found." });
    }
    res.status(200).json({ message: "Todo Updated successfully.", todo });
  } catch (error) {
    res.status(500).json("Internal Server Error", error);
  }
});

module.exports = router;
