const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const Role = require("../models/role");
const { successResponse, errorResponse } = require("../utils/responseUtils");
const { HTTP_STATUS_CODES, MESSAGES } = require("../utils/constants");

function generateAccessToken(user) {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "150m",
  });
  return token;
}

exports.postSignUp = async (req, res, next) => {
  const { email, password, roleId = "66af20878b7ab3277934200a" } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const role = await Role.findOne({ _id: roleId });

    if (!role) {
      return res
        .status(HTTP_STATUS_CODES.OK)
        .json(errorResponse(MESSAGES.ROLE_NOT_FOUND, HTTP_STATUS_CODES.OK));
    }

    const isDuplicateEmail = await User.findOne({ email: email });

    if (isDuplicateEmail) {
      return res
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .json(errorResponse(MESSAGES.EMAIL_EXISTS, HTTP_STATUS_CODES.OK));
    }

    const user = new User({
      email: email,
      password: hashedPassword,
      roleId: roleId,
    });

    await user.save();

    res.status(201).send(successResponse(null, "User created successfully"));
  } catch (err) {
    next(err);
  }
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email }).populate("roleId");

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const accessToken = generateAccessToken({
        user: { email: email, role: [user.roleId] },
      });

      return res.json(successResponse({ token: accessToken }));
    }
  } catch (error) {
    next(error);
  }
};
