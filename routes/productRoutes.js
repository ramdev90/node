const express = require("express");
const { isAdmin } = require("../middlewares/authorizationMiddleware");

const router = express.Router();

router.get("/products", isAdmin, (req, res, next) => {
  res.json({ name: "ramdev" });
});
module.exports = router;
