const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo, Brand} = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
  async create(req, res, next) {
    try {
      let {name, price, brandId, typeId, number, info} = req.body
      const {img} = req.files
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

  async put(req, res, next) {
    try {
      let { id, name, price, brandId, typeId, number, info } = req.body
      let device;
      if(req.files) {
        const { img } = req.files      
        let fileName = uuid.v4() + ".jpg"//v4 сгенерирует id
        img.mv(path.resolve(__dirname, '..', 'static', fileName))//переместить файлы
        device = await Device.update({ name, price, brandId, typeId, number, img: fileName }, { where: { id } })
      } else {
        device = await Device.update({ name, price, brandId, typeId, number }, { where: { id } })
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
    let {brandId, typeId, limit, page} = req.query
    page = Number(page) || 1
    limit = Number(limit) || 10;
    let offset = page * limit - limit
    let devices;
    if(!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset, include: [{ model: Brand, attributes: ['name'] }] })
    }
    if(brandId && !typeId) {
      devices = await Device.findAndCountAll({ where: { brandId }, limit, offset, include: [{ model: Brand, attributes: ['name'] }] })
    }
    if(!brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId }, limit, offset, include: [{ model: Brand, attributes: ['name'] }] })
    }
    if(brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset, include: [{ model: Brand, attributes: ['name'] }] })
    }
    return res.json(devices)
  }

  async getOne(req, res) {
    const {id} = req.params
    const device = await Device.findOne(
      {
        where: {id},
        include: [{ model: DeviceInfo, as: 'info' }, { model: Brand, attributes: ['name'] }]
      },
    )
    return res.json(device)
  }

  async update(req, res) {
    //const {id} = req.params
    const id = req.id
    //const {rating} = req.query
    const rating = req.rating
    const device = await Device.findOne(
      {
        where: {id}
      }
    )
    await device.update({ rating: rating })
    //await device.save()
    return res.json(device)
  }
  
  
}

module.exports = new DeviceController()