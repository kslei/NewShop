const { body } = require("express-validator");

const mailValidateChainMethod = [
  body("email").isEmail().normalizeEmail().withMessage("Provide valid email"),
  body("message")
    .exists()
    .withMessage("User name is required")
    .isString()
    .withMessage("User name should be string"),
]
module.exports = { mailValidateChainMethod }