const { randomBytes, createHmac } = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name Should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your PAssword"],
      minLength: [8, "Password Should Contain minimun 8 characters"],
      select: false,
    },
    profile_url: {
      type: String,
      //   required: true,
      default:
        "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1709122726~exp=1709123326~hmac=fbd1ca7b99d08036d4e6db72df65b887ccceb7acdacb0b2cf44686ac1b472d0d",
    },
    salt: {
      type: String,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  try {
    const user = this;
    // console.log("user", user);

    if (!user.isModified("password")) return next();

    const salt = randomBytes(16).toString();

    const hashedPassword = createHmac("sha256", salt)
      .update(user.password)
      .digest("hex");
    // console.log("hashedPassword", hashedPassword);

    user.salt = salt;
    user.password = hashedPassword;

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    try {
      const user = await this.findOne({ email }).select("+password");
      // console.log("user", user);

      if (!user) throw new Error("User not found!");

      const salt = user.salt;
      const hashedPassword = user.password;
      // console.log("hashedPassword", hashedPassword);

      const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
      // console.log("userProvidedHash", userProvidedHash);

      if (hashedPassword !== userProvidedHash)
        throw new Error("Incorrect Password");

      user.password = undefined;
      const token = createTokenForUser(user);
      return token;
    } catch (error) {
      return res.json({ error: "Token not Generate!", error });
    }
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
