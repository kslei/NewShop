const fs = require('fs')
const path = require('path')
const { DeviceImage } = require('../models/models')
const ApiError = require('../error/ApiError')

class ImageController {
  async create(req, res, next) {
    try {
      let { deviceId } = req.body
      const { img } = req.files;
      let fileName = img.name;
      console.log('fileName', fileName)
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
      let fileName = img.name;
      let oldFile = await DeviceImage.findOne({
        where: { id },
        attributes: ['img']
      })
      console.log("oldFile", oldFile.img)
      fs.unlinkSync(path.resolve(__dirname, '..', 'static', oldFile.img))
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const deviceImage = await DeviceImage.update({ deviceId, img: fileName }, { where: { id } })
      return res.json(deviceImage)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new ImageController()