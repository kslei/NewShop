const fs = require('fs')
const path = require('path')
const { DeviceFrame } = require('../models/models')
const ApiError = require('../error/ApiError')

class FrameController {
  async create(req, res, next) {
    try {
      let { deviceId } = req.body
      const {frame} = req.files;
      let fileName = frame.name;
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
      console.log("frame", frame)
      let fileName = frame.name;
      let oldFile = await DeviceFrame.findOne({
        where: {id},
        attributes: ['frame']
      })
      console.log("oldFile", oldFile.frame)
      fs.unlinkSync(path.resolve(__dirname, '..', 'static', oldFile.frame))
      frame.mv(path.resolve(__dirname, '..', 'static', fileName))
      const deviceFrame = await DeviceFrame.update({ deviceId, frame: fileName }, { where: { id } })
      return res.json(deviceFrame)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new FrameController()