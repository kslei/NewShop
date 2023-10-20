const { Delivery } = require('../models/models')
const ApiError = require('../error/ApiError');
const { validationResult } = require('express-validator')
const i18next = require('i18next');

class DeliveryController {
  async create(req, res, next) {
    try {
      //validation body fields
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }
      const { name } = req.body
      const delivery = await Delivery.create({ name })
      return res.json(delivery)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    const deliveries = await Delivery.findAll()
    deliveries.map(delivery => {
      let name = i18next.t(delivery.name)
      delivery.name = name
    })
    return res.json(deliveries)
  }

  async remove(req, res, next) {
    try {
      const {id} = req.query
      const data = await Delivery.destroy({where: {id}})
      return res.json(data)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new DeliveryController()