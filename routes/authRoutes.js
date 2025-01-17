const express = require("express");

const authController = require("../controllers/authController");
const { loginValidate } = require("../validators/authValidator");

const router = express.Router();

router.post("/signup", authController.postSignUp);

router.post("/login", loginValidate, authController.postLogin);

// router.post(
//   "/signup",
//   [
//     check("email")
//       .isEmail()
//       .withMessage("Please enter a valid email.")
//       .custom((value, { req }) => {
//         // if (value === 'test@test.com') {
//         //   throw new Error('This email address if forbidden.');
//         // }
//         // return true;
//         return User.findOne({ email: value }).then((userDoc) => {
//           if (userDoc) {
//             return Promise.reject(
//               "E-Mail exists already, please pick a different one."
//             );
//           }
//         });
//       })
//       .normalizeEmail(),
//     body(
//       "password",
//       "Please enter a password with only numbers and text and at least 5 characters."
//     )
//       .isLength({ min: 5 })
//       .isAlphanumeric()
//       .trim(),
//     body("confirmPassword")
//       .trim()
//       .custom((value, { req }) => {
//         if (value !== req.body.password) {
//           throw new Error("Passwords have to match!");
//         }
//         return true;
//       }),
//   ],
//   authController.postSignup
// );

// router.post("/logout", authController.postLogout);

// router.get("/reset", authController.getReset);

// router.post("/reset", authController.postReset);

// router.get("/reset/:token", authController.getNewPassword);

// router.post("/new-password", authController.postNewPassword);

module.exports = router;
