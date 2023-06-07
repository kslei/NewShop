const uuid = require('uuid')
const path = require('path')
const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError');

class BrandController {
  async create(req, res) {
    try {
      const { name } = req.body
      const { img } = req.files
      let fileName = uuid.v4() + ".jpg"
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const brand = await Brand.create({ name, img: fileName })
      return res.json(brand)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    const brands = await Brand.findAll({order: ['name']})
    return res.json(brands)
  }

}

module.exports = new BrandController()