const uuid = require('uuid')
const path = require('path')
const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError');

class BrandController {
  async create(req, res, next) {
    try {
      const { name } = req.body
      const { img } = req.files
      //validation brand name
      if (!name) {
        return next(ApiError.badRequest('Некорректное название'))
      }
      const oldName = await Brand.findOne({ where: { name } })
      if (oldName) {
        return next(ApiError.badRequest('Бренд с таким названием существует'))
      }
      //validation image
      if(img.mimetype !== 'image/jpeg') {
        return next(ApiError.badRequest('Некорректный тип файла'))
      }
      //creating a unique file name
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