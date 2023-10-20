const { OrderDevice, Order, User, Device, Brand, Delivery } = require('../models/models')
const ApiError = require('../error/ApiError')
const deviceController = require('./deviceController')
const i18next = require('i18next');

class OrderController {
  async create(req, res) {
    try {
      let resp = []
      const { deviceId, quantity, userId, date, deliveryId } = req.body
      const status = "In_processing"
      //create order
      const order = await Order.findOrCreate({ attributes: ['id'], where: { userId, status, date, deliveryId } })
      const orderId = order[0].id
      //create device for order
      for (let i=0; i<deviceId.length; i++) {
        const orderDevice = await OrderDevice.create({ deviceId: deviceId[i], quantity: quantity[i], orderId })
        resp.push(orderDevice)
      }
      return res.json(resp)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async get(req, res, next) {
    const { status } = req.query
    const data = await Order.findAll({ where: { status }, include: [{ model: OrderDevice, attributes: ['id', 'quantity'], include: [{ model: Device, attributes: ['id', 'name', 'price', 'discount'], include: [{ model: Brand, attributes: ['name'] }] }] }, { model: User, attributes: ['email', 'name', 'phone'] }, {model: Delivery, attributes: ['name']}] })
    if (data.length === 0) {
      return next(ApiError.badRequest(`${i18next.t("No orders")}`))
    }
    if (data[0].order_devices.length === 0) {
      return next(ApiError.badRequest(`${i18next.t("No items in cart")}`))
    }
    data.map(order=>{
      order.order_devices.map(device=>{
        let name = device.device.name
        device.device.name = i18next.t(name)
      })
      let delname = order.delivery.name
      order.delivery.name = i18next.t(delname)
    })
    return res.json(data)
  }

  async putOrder(req, res, next) {
    try {
      const { id, status, date, deliveryId } = req.body
      if (status === "Executed") {
        const data = await Order.findAll({ where: {id}, include: [{ model: OrderDevice, attributes: ['deviceId', 'quantity']}]})
        //data[0].order_devices.map(item => console.log(item.deviceId, item.quantity))
        //check the quantity and form the balance of the goods taking into account the order
        const devices = data[0].order_devices
        const num = []
        for (let i = 0; i < devices.length; i++) {
          const device = await Device.findOne(
            {
              where: { id: devices[i].deviceId }
            }
          )
          const number = device.number - devices[i].quantity
          if (number < 0) {
            return next(ApiError.badRequest(`${i18next.t("Insufficient goods")}`))
          }
          num.push(number)
        }
        for (let i=0; i < devices.length; i++) {
          await Device.update({number: num[i] }, {where: { id: devices[i].deviceId }} )
        }
      }
      const orderStatus = await Order.update({ status: status, date: date, deliveryId: deliveryId }, { where: { id } })
      return res.json(orderStatus)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
    
  }
}

module.exports = new OrderController()