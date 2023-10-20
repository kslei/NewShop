const uuid = require('uuid')
const path = require('path')
const { Brand } = require('../models/models')
const i18next = require('i18next');
const ApiError = require('../error/ApiError');

class BrandController {
  async create(req, res, next) {
    try {
      const { name } = req.body
      const { img } = req.files
      //validation brand name
      if (!name) {
        return next(ApiError.badRequest(`${i18next.t("Incorrect")} ${i18next.t("Name").toLowerCase()}`))
      }
      const oldName = await Brand.findOne({ where: { name } })
      if (oldName) {
        return next(ApiError.badRequest(`${i18next.t("Brand exists")}`))
      }
      //validation image
      if(img.mimetype !== 'image/jpeg') {
        return next(ApiError.badRequest(`${i18next.t("Incorrect_male")} ${i18next.t("File").toLowerCase()}`))
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