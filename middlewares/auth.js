const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    console.log("All cookies:", req.cookies);
    const tokenCookieValue = req.cookies[cookieName];
    // console.log("tokenCookieValue", tokenCookieValue);

    if (!tokenCookieValue) {
      return next();
    } else {
      try {
        const userPayload = validateToken(tokenCookieValue);
        // console.log("Decoded token payload:", userPayload);
        req.user = userPayload;
        next();
      } catch (error) {
        console.error("Token Validation Error:", error.message);
        return res.json({ error: "Authenticate usigng valid token!" });
      }
    }
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
