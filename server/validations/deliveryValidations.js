const { body } = require("express-validator");

const deliveryValidateChainMethod = [
  body("name")
    .exists()
    .withMessage("Delivery name is required")
    .isString()
    .withMessage("Delivery name should be string"),
]
module.exports = { deliveryValidateChainMethod }