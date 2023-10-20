const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo, DeviceFrame, DeviceImage, Brand, Type} = require('../models/models')
const {Op} = require('sequelize')
const { validationResult } = require("express-validator");
const i18next = require('i18next');
const ApiError = require('../error/ApiError')

class DeviceController {
  async create(req, res, next) {
    //validation body fields
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    try {
      let {name, price, brandId, typeId, number, info} = req.body
      const {img} = req.files
      //validation image
      if (img.mimetype !== 'image/jpeg') {
        return next(ApiError.badRequest(`${i18next.t("Incorrect_male")} ${i18next.t("File").toLowerCase()}`))
      }
      //creating a unique file name
      let fileName = uuid.v4() + ".jpg"//v4 сгенерирует id
      img.mv(path.resolve(__dirname, '..', 'static', fileName))//переместить файлы
      const device = await Device.create({ name, price, brandId, typeId, number, img: fileName })
      //set info
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
    //validation body fields
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    try {
      let { id, name, price, brandId, typeId, discount, news, number, info } = req.body
      let device;
      if(req.files) {
        const { img } = req.files
        //validation image
        if (img.mimetype !== 'image/jpeg') {
          return next(ApiError.badRequest(`${i18next.t("Incorrect_male")} ${i18next.t("File").toLowerCase()}`))
        }
        //create unique name    
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        device = await Device.update({ name, price, brandId, typeId, discount, news, number, img: fileName }, { where: { id } })
      } else {
        device = await Device.update({ name, price, brandId, typeId, discount, news, number }, { where: { id } })
      }
      //update info
      if (info) {
        info = JSON.parse(info)
        info.forEach(i =>
          DeviceInfo.update({
            title: i.title,
            description: i.description,
          }, { where: { id: i.id }})
        )
      }
      let newname = i18next.t(device.name)
      device.name = newname
      return res.json(device)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let {brandId, typeId, limit, page, news, discount} = req.query
    /* let lng = req.headers["accept-language"]
    
    if (lng !== i18next.language) {
      i18next.changeLanguage(lng)
    } */
    //i18next.changeLanguage(req.lang)
    
    page = Number(page) || 1
    limit = Number(limit) || 10;
    discount = Number(discount) || 0;
    news = news || "false";
    let offset = page * limit - limit
    let devices;
    //get new devices
    if(news === "true") {
      devices = await Device.findAll({ order: ['id'], where: { news: true }, include: [{ model: Brand, attributes: ['name', 'id'] }, { model: Type, attributes: ['name', 'id'] }, { model: DeviceFrame, attributes: ['id', 'frame'] }, { model: DeviceImage, attributes: ['id', 'img'] }], distinct: true })
      devices.map(device => {
        let name = i18next.t(device.name)
        device.name = name
      })
      return res.json(devices)
    }
    //get devices with discount
    if(discount !==0) {
      devices = await Device.findAll({ order: ['id'], where: { discount: { [Op.ne]: 0 } }, include: [{ model: Brand, attributes: ['name', 'id'] }, { model: Type, attributes: ['name', 'id'] }, { model: DeviceFrame, attributes: ['id', 'frame'] }, { model: DeviceImage, attributes: ['id', 'img'] }], distinct: true })
      devices.map(device => {
        let name = i18next.t(device.name)
        device.name = name
      })
      return res.json(devices)
    }
    //get devices with pagination and filtered brand & type
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
    
    devices.rows.map(device => {
      let name = i18next.t(device.name)
      let typename = i18next.t(device.type.name)
      device.name = name
      device.type.name = typename
    })
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
    let name = i18next.t(device.name)
    device.name = name
    // console.log("INFO", device.info)
    device.info.map(inf=>{
      let title = i18next.t(inf.title)
      if (/[a-zA-Z]/.test(inf.description)) {
        let description = i18next.t(inf.description)
        inf.description = description
      }
      
      inf.title = title
      
    }) 
    return res.json(device)
  }

  //update device for rating
  async update(req, res) {
    const id = req.id
    const rating = req.rating
    const device = await Device.findOne(
      {
        where: {id}
      }
    )
    await device.update({ rating: rating })
    let name = i18next.t(device.name)
    device.name = name
    return res.json(device)
  }

  
}

module.exports = new DeviceController()