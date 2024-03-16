const { validateToken } = require("../services/authentication");

// function checkForAuthenticationCookie(cookieName) {
//   return (req, res, next) => {
//     console.log("All cookies:", req.cookies);
//     const tokenCookieValue = req.cookies[cookieName];
//     // console.log("tokenCookieValue", tokenCookieValue);

//     if (!tokenCookieValue) {
//       return next();
//     } else {
//       try {
//         const userPayload = validateToken(tokenCookieValue);
//         // console.log("Decoded token payload:", userPayload);
//         req.user = userPayload;
//         next();
//       } catch (error) {
//         console.error("Token Validation Error:", error.message);
//         return res.json({ error: "Authenticate usigng valid token!" });
//       }
//     }
//   };
// }

const fetchUser = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token in fetch user:", token);

  if (!token) {
    res.status(401).json({ error: "Authenticate using valid token" });
  } else {
    try {
      const data = validateToken(token);
      req.user = data;
      next();
    } catch (error) {
      res.status(401).json({ error: "Authenticate using valid token" });
    }
  }
};

module.exports = {
  fetchUser,
};
