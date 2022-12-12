const { Delivery } = require('../models/models')
const ApiError = require('../error/ApiError');

class DeliveryController {
  async create(req, res) {
    const { name } = req.body
    const delivery = await Delivery.create({ name })
    return res.json(delivery)
  }

  async getAll(req, res) {
    const deliveries = await Type.findAll()
    return res.json(deliveries)
  }

}

module.exports = new DeliveryController()