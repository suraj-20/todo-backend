const User = require("../models/user");

module.exports.handleUserRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email already exist" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.status(200).json({ success: 1, user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: 0, message: "Internal server error" });
  }
};

module.exports.handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log(token);
    return res.json({ success: true, token });
  } catch (error) {
    return res.json({ error: "Incorrect Email or password" });
  }
};
