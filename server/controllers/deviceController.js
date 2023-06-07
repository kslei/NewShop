const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo, DeviceFrame, DeviceImage, Brand, Type} = require('../models/models')
const {Op} = require('sequelize')
const ApiError = require('../error/ApiError')

class DeviceController {
  async create(req, res, next) {
    try {
      let {name, price, brandId, typeId, number, info} = req.body
      const {img} = req.files
      console.log('img', img)
      let fileName = uuid.v4() + ".jpg"//v4 сгенерирует id
      img.mv(path.resolve(__dirname, '..', 'static', fileName))//переместить файлы
      const device = await Device.create({ name, price, brandId, typeId, number, img: fileName })
      if (info) {
        info = JSON.parse(info)
        info.forEach(i =>
          DeviceInfo.create({
            title: i.title,
            description: i.description, 
            deviceId: device.id
          })
        )
      }
      
      return res.json(device)
    } catch(e) {
        next(ApiError.badRequest(e.message))
    }
  }

  async createInfo(req, res, next) {
    try {
      let {deviceId, title, description} = req.body
      const info = await DeviceInfo.create({deviceId, title, description})
      return res.json(info)
    } catch (e) {
      next(ApiError.badRequest(e.message)) 
    }
  }

  async put(req, res, next) {
    try {
      let { id, name, price, brandId, typeId, discount, news, number, info } = req.body
      let device;
      if(req.files) {
        const { img } = req.files      
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        device = await Device.update({ name, price, brandId, typeId, discount, news, number, img: fileName }, { where: { id } })
      } else {
        device = await Device.update({ name, price, brandId, typeId, discount, news, number }, { where: { id } })
      }
      
      if (info) {
        info = JSON.parse(info)
        info.forEach(i =>
          DeviceInfo.update({
            title: i.title,
            description: i.description,
          }, { where: { id: i.id }})
        )
      }

      return res.json(device)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let {brandId, typeId, limit, page, news, discount} = req.query
    page = Number(page) || 1
    limit = Number(limit) || 10;
    discount = Number(discount) || 0;
    let offset = page * limit - limit
    let devices;
    console.log('discount', discount)
    if(news == 'true' && discount === 0) {
      devices = await Device.findAll({ order: ['id'], where: { news: true }, include: [{ model: Brand, attributes: ['name', 'id'] }, { model: Type, attributes: ['name', 'id'] }, { model: DeviceFrame, attributes: ['id', 'frame'] }, { model: DeviceImage, attributes: ['id', 'img'] }], distinct: true })
    } else {
      if ((news === 'false' || !news) && discount !== 0) {
        devices = await Device.findAll({ order: ['id'], where: {discount: {[Op.ne]: 0}}, include: [{ model: Brand, attributes: ['name', 'id'] }, { model: Type, attributes: ['name', 'id'] }, { model: DeviceFrame, attributes: ['id', 'frame'] }, { model: DeviceImage, attributes: ['id', 'img'] }], distinct: true })
      } else {
        if (news === 'true' && discount !== 0) {
          devices = await Device.findAll({ order: ['id'], where: { news: true, discount: { [Op.ne]: 0 } }, include: [{ model: Brand, attributes: ['name', 'id'] }, { model: Type, attributes: ['name', 'id'] }, { model: DeviceFrame, attributes: ['id', 'frame'] }, { model: DeviceImage, attributes: ['id', 'img'] }], distinct: true })
        } else {
          if(!brandId && !typeId) {
            devices = await Device.findAndCountAll({ order: [['number', 'DESC'], ['id', 'DESC']], limit, offset, include: [{ model: Brand, attributes: ['name', 'id'] }, { model: Type, attributes: ['name', 'id'] }, { model: DeviceFrame, attributes: ['id', 'frame'] }, { model: DeviceImage, attributes: ['id', 'img'] }], distinct: true })
          }
          if(brandId && !typeId) {
            devices = await Device.findAndCountAll({ order: [['number', 'DESC'], ['id', 'DESC']], where: { brandId }, limit, offset, include: [{ model: Brand, attributes: ['name', 'id'] }, { model: Type, attributes: ['name', 'id'] }, { model: DeviceFrame, attributes: ['id', 'frame'] }, { model: DeviceImage, attributes: ['id', 'img'] }], distinct: true })
          }
          if(!brandId && typeId) {
            devices = await Device.findAndCountAll({ order: [['number', 'DESC'], ['id', 'DESC']], where: { typeId }, limit, offset, include: [{ model: Brand, attributes: ['name', 'id'] }, { model: Type, attributes: ['name', 'id'] }, { model: DeviceFrame, attributes: ['id', 'frame'] }, { model: DeviceImage, attributes: ['id', 'img'] }], distinct: true })
          }
          if(brandId && typeId) {
            devices = await Device.findAndCountAll({ order: [['number', 'DESC'], ['id', 'DESC']], where: { brandId, typeId }, limit, offset, include: [{ model: Brand, attributes: ['name', 'id'] }, { model: Type, attributes: ['name', 'id'] }, { model: DeviceFrame, attributes: ['id', 'frame'] }, { model: DeviceImage, attributes: ['id', 'img'] }], distinct: true })
          }
        }
      }
      
    }
        
    return res.json(devices)
  }

  async getOne(req, res) {
    const {id} = req.params
    const device = await Device.findOne(
      {
        where: {id},
        include: [{ model: DeviceInfo, as: 'info' }, { model: Brand, attributes: ['name'] }, {model: DeviceFrame, attributes: ['id', 'frame']}, {model: DeviceImage, attributes: ['id', 'img']}]
      },
    )
    return res.json(device)
  }

  async update(req, res) {
    const id = req.id
    const rating = req.rating
    const device = await Device.findOne(
      {
        where: {id}
      }
    )
    await device.update({ rating: rating })
    return res.json(device)
  }

  
}

module.exports = new DeviceController()