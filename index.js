require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const { connectMongoDb } = require("./config/mongoDb");

// Routes
const userRoute = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 8000;
connectMongoDb(process.env.MONGO_URL);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.resolve("uploads")));

app.use("/api/v1", userRoute);

app.get("/", (req, res) => {
  res.send("Jai Shree Krishna");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});
