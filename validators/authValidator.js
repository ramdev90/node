const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.loginValidate = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  async (req, res, next) => {
    const { email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: email }).populate("roleId");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    next();
  },
];
