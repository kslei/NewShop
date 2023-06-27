const fs = require('fs')
const path = require('path')
const { DeviceImage } = require('../models/models')
const ApiError = require('../error/ApiError')

class ImageController {
  async create(req, res, next) {
    try {
      let { deviceId } = req.body
      const { img } = req.files;
      //validation image
      if (img.mimetype !== 'image/jpeg' && img.mimetype !== 'image/png') {
        return next(ApiError.badRequest('Некорректный тип файла'))
      }
      //create file name
      let fileName = img.name;
      //record file
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const deviceImage = await DeviceImage.create({ deviceId, img: fileName })
      return res.json(deviceImage)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async put(req, res, next) {
    try {
      let { id, deviceId } = req.body
      const { img } = req.files;
      //validate image
      if (img.mimetype !== 'image/jpeg' && img.mimetype !== 'image/png') {
        return next(ApiError.badRequest('Некорректный тип файла'))
      }
      //creating a file name
      let fileName = img.name;
      //set old file name
      let oldFile = await DeviceImage.findOne({
        where: { id },
        attributes: ['img']
      })
      //delete old file
      fs.unlinkSync(path.resolve(__dirname, '..', 'static', oldFile.img))
      //record new file
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const deviceImage = await DeviceImage.update({ deviceId, img: fileName }, { where: { id } })
      return res.json(deviceImage)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new ImageController()