const express = require("express");
const { handleUserRegister } = require("../controllers/user");
const multer = require("multer");
const path = require("path")

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, (path.resolve("uploads")));
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.single("image", async (req, res) => {
    console.log(req.file, req.body);
    const imagePath = req.file ? req.file.path : null;

    req.json({ imagePath });
  })
);

router.post("/register", upload.single("image_url"), handleUserRegister);

module.exports = router;
