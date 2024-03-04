const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(403).json({ error: "No token provided" });
  }

  const bearer = bearerHeader.split(" ");
  const token = bearer[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
      username: decoded.username,
    };
    next();
  });
}

function requireRole(role) {
  return function (req, res, next) {
    verifyToken(req, res, () => {
      if (req.user.role === role) { // change from req.userRole to req.user.role
        next();
      } else {
        return res.status(403).json({ error: `Require ${role} Role!` });
      }
    });
  };
}
const authJwt = {
  verifyToken,
  isAdmin: requireRole("admin"),
  isManager: requireRole("manager"),
  isEmployee: requireRole("employee"),
};

module.exports = authJwt;
