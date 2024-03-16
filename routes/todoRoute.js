const express = require("express");
const Todo = require("../models/todoModel");
const User = require("../models/user");

const router = express.Router();

router.post("/todos", async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user._id;
    console.log("user id", userId);
    const { title, description } = req.body;

    // Create new todo
    const newTodo = new Todo({ title, description, userId });
    await newTodo.save();

    await User.findByIdAndUpdate(userId, { $push: { todos: newTodo._id } });

    res
      .status(201)
      .json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/todos", async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user._id;
    console.log("userId", userId);

    const user = await User.findById(userId).populate("todos");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // const todos = await Todo.find({});
    res.status(200).json({ todos: user.todos });
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
    console.log(req.user, req.params.id);
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found." });
    }
    res.status(201).json({ message: "Todo Updated successfully.", todo });
  } catch (error) {
    res.status(500).json("Internal Server Error", error);
  }
});

module.exports = router;
