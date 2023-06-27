const { body } = require("express-validator");

const deviceValidateChainMethod = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Device name is required")
    .isString()
    .withMessage("Device name should be string"),
  body("price")
    .exists()
    .withMessage("Device price is required")
    .isString()
    .withMessage("Device price should be string")
    .isFloat({min: 0.01})
    .withMessage("Device price should be float"),
  body("number")
    .exists()
    .withMessage("Device number is required")
    .isString()
    .withMessage("Device number should be string")
    .isInt({min: 1})
    .withMessage("Device number should be integer"),
  body("brandId")
    .exists()
    .withMessage("Device brandId is required")
    .isString()
    .withMessage("Device brandId should be string")
    .isInt({ min: 1 })
    .withMessage("Device brandId should be integer"),
  body("typeId")
    .exists()
    .withMessage("Device typeId is required")
    .isString()
    .withMessage("Device typeId should be string")
    .isInt({ min: 1 })
    .withMessage("Device typeId should be integer"),
]
module.exports = { deviceValidateChainMethod }