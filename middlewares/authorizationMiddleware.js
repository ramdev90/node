const jwt = require("jsonwebtoken");

function getRoleFromToken(authorization) {
  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return decoded?.user?.role[0]?.name;
}

const isAdmin = (req, res, next) => {
  const role = getRoleFromToken(req.headers.authorization);
  if (role === "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
};

const isModerator = (req, res, next) => {
  const role = getRoleFromToken(req.headers.authorization);
  if (role === "moderator") {
    return next();
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
};

const isAdminOrModerator = (req, res, next) => {
  const role = getRoleFromToken(req.headers.authorization);
  if (role === "admin" || role === "moderator") {
    return next();
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = {
  isAdmin,
  isModerator,
  isAdminOrModerator,
};
