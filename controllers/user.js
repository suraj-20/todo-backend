const User = require("../models/user");

module.exports.handleUserRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const profile_url = req.file ? req.file.path : null;
    console.log("profile_url", profile_url);

    if (!name || !email || !password || !profile_url || !role) {
      return res.json({ error: "Please fill all the fields." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email already Exist." });
    }

    const user = await User.create({
      name,
      email,
      password,
      profile_url,
      role,
    });

    return res.status(200).json({ success: 1, user });
  } catch (error) {
    return res.json({ error: "Internal server error." });
  }
};

module.exports.handleUserLogin = async(req, res) => {
    const {email, password} = req.body;
}