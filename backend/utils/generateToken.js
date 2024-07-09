const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  // console.log(token)
  //Set JWT as an HTTP - Only cookie
  res.cookie("jwt", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });
  // res.cookie("jwt", token, {
  //   httpOnly: true, // Set to true to prevent access by JavaScript
  //   secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  //   sameSite: "strict", // Prevent CSRF attacks
  //   maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  //   domain: process.env.COOKIE_DOMAIN || undefined, // Set domain if needed
  //   path: '/', // Set path if needed
  // });
};

module.exports = generateToken;
