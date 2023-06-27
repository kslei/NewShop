const { body } = require("express-validator");

const userLogValidateChainMethod = [
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
]
module.exports = { userLogValidateChainMethod }