const jwt = require("jsonwebtoken");
const { ErrorResponse } = require("../utils/ErrorResponse");

const verifyToken = (req, res, next) => {
  
  try {
    // console.log(req.cookies.access_token);
    const token = req.cookies.access_token;
    if (token) {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload
        next()
    } else {
        next(new ErrorResponse("Forbidden", 403));
    }
  } catch (error) {
    next(new ErrorResponse("Forbidden", 403));
  }
};

module.exports = {
    verifyToken,
}