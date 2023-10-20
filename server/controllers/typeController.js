const uuid = require('uuid')
const path = require('path')
const {Type} = require('../models/models')
const i18next = require('i18next');
const ApiError = require('../error/ApiError');


class TypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body
      const { img } = req.files
      //validation type name
      if (!name) {
        return next(ApiError.badRequest(`${i18next.t("Incorrect")} ${i18next.t("Name").toLowerCase()}`))
      }
      const oldName = await Type.findOne({ where: { name } })
      if (oldName) {
        return next(ApiError.badRequest(`${i18next.t("Type exists")}`))
      }
      //validation image
      if (img.mimetype !== 'image/jpeg') {
        return next(ApiError.badRequest(`${i18next.t("Incorrect_male")} ${i18next.t("File").toLowerCase()}`))
      }
      //creating a unique file name
      let fileName = uuid.v4() + ".jpg"
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const type = await Type.create({ name, img: fileName })
      return res.json(type)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let types = await Type.findAll({order: ['id']})
    //console.log("LANG", i18next.language)
    types.map(type => {
      let name = i18next.t(type.name)
      type.name = name
    })
    return res.json(types)
  }

}

module.exports = new TypeController()