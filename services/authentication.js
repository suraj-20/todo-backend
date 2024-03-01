const JWT = require("jsonwebtoken");

const SECREAT_KEY = "THISISMYSECRETKEY";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = JWT.sign(payload, SECREAT_KEY, {
    expiresIn: "1h",
  });
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, SECREAT_KEY, {
    expiresIn: "1h",
  });
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
