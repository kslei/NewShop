const ApiError = require('../error/ApiError');
const { Rating } = require('../models/models');
const deviceController = require('./deviceController');

class RatingController {
  async create(req, res, next) {
    try {
      let { rate, userId, deviceId } = req.body
      //is autorized?
      if (!userId) {
        return next(ApiError.badRequest("Войдите в свою учетную запись или зарегистрируйтесь"))
      }
      //get rating for this user & this device, if !rating => create rate
      let grade = await Rating.findOne({ where: { userId, deviceId } })
      if (grade) {
        return next(ApiError.badRequest('Вы уже ставили оценку'))
      }
      await Rating.create({ rate, userId, deviceId })

      let deviceRate = (await Rating.findAll({ attributes: ['rate'], where: { deviceId } })).map(item => Number(item['rate']))
      //calculate rating
      const ratings = (deviceRate.reduce((sum, item) => sum = sum + item, 0)) / deviceRate.length
      //set device.rating
      return deviceController.update(
        req = {
          id: deviceId,
          rating: ratings
        },
        res
      )
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getOne(req, res, next) {
    let {deviceId} = req.query
    
    let deviceRate = (await Rating.findAll({ attributes: ['rate'], where: { deviceId } })).map(item => Number(item['rate']))
    const ratings = (deviceRate.reduce((sum, item) => sum = sum + item, 0))/deviceRate.length
    return deviceController.update(
      req = {
        id: deviceId,
        rating: ratings
      },
      res
    )
  }
}
module.exports = new RatingController()