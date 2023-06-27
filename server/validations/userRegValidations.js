const { body } = require("express-validator");

const userRegValidateChainMethod = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("User name is required")
    .isString()
    .withMessage("User name should be string"),
  body("email").isEmail().normalizeEmail().withMessage("Provide valid email"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),
  body("phone")
    .exists()
    .withMessage("Phone number is required")
    .isString()
    .withMessage("phone number should be string")
    .custom((value) => {
      if (value.length < 10) {
        return Promise.reject("The phone number must be at least 10 digits.");
      } else {
        return true;
      }
    }),
  body("role")
    .exists()
    .withMessage("User role is required")
    .isString()
    .withMessage("User role should be string")
]
module.exports = {userRegValidateChainMethod}