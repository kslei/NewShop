const {DeviceInfo } = require('../models/models')

class InfoController {
  async getAll(req, res) {
    const {deviceId} = req.query
    const info = await DeviceInfo.findAll({ where: { deviceId }, attributes: ['id', 'title', 'description'] })
    return res.json(info)
  }
}
module.exports = new InfoController()