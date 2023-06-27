const uuid = require('uuid')
const path = require('path')
const {Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body
      const { img } = req.files
      //validation type name
      if (!name) {
        return next(ApiError.badRequest('Некорректное название'))
      }
      const oldName = await Type.findOne({ where: { name } })
      if (oldName) {
        return next(ApiError.badRequest('Тип с таким названием существует'))
      }
      //validation image
      if (img.mimetype !== 'image/jpeg') {
        return next(ApiError.badRequest('Некорректный тип файла'))
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
    const types = await Type.findAll({order: ['id']})
    return res.json(types) 
  }

}

module.exports = new TypeController()