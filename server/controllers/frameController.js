const fs = require('fs')
const path = require('path')
const { DeviceFrame } = require('../models/models')
const ApiError = require('../error/ApiError')

class FrameController {
  async create(req, res, next) {
    try {
      let { deviceId } = req.body
      const {frame} = req.files;
      //validation frame
      if (frame.mimetype !== 'image/jpeg' && frame.mimetype !== 'image/png') {
        return next(ApiError.badRequest('Некорректный тип файла'))
      }
      //creating a file name
      let fileName = frame.name;
      //record file
      frame.mv(path.resolve(__dirname, '..', 'static', fileName))

      const deviceFrame = await DeviceFrame.create({ deviceId, frame: fileName })
      return res.json(deviceFrame)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async put(req, res, next) {
    try {
      let { id,  deviceId } = req.body
      const { frame } = req.files;
      //validation frame
      if (frame.mimetype !== 'image/jpeg' && frame.mimetype !== 'image/png') {
        return next(ApiError.badRequest('Некорректный тип файла'))
      }
      //create a file name
      let fileName = frame.name;
      //set old file name
      let oldFile = await DeviceFrame.findOne({
        where: {id},
        attributes: ['frame']
      })
      //delete old file
      fs.unlinkSync(path.resolve(__dirname, '..', 'static', oldFile.frame))
      //record new file
      frame.mv(path.resolve(__dirname, '..', 'static', fileName))
      const deviceFrame = await DeviceFrame.update({ deviceId, frame: fileName }, { where: { id } })
      return res.json(deviceFrame)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new FrameController()