const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Order} = require('../models/models')
const { validationResult } = require("express-validator");

const generateJwt = (id, email, role, name, phone) => {
  return jwt.sign(
      {id, email, role, name, phone},
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
    )
}

class UserController {
  async registration(req, res, next) {
    //validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const {email, password, role, name, phone} = req.body
    if (!email && !password) {
      return next(ApiError.badRequest('Некорректный email или password'))
    }
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email существует'))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, role, password: hashPassword, name, phone})//create user
    const order = await Order.create({userId: user.id})//create order
    const token = generateJwt(user.id, user.email, user.role, user.name, user.phone)//get token
    return res.json({token})
  }
  
  async login(req, res, next) {
    //validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if (!user) {
      return next(ApiError.internal('Пользователь с таким email не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'))
    }

    const token = generateJwt(user.id, user.email, user.role, user.name, user.phone)//get token
    return res.json({token})
  }
  
  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name, req.user.phone)
      return res.json({token})
    } catch (e) {
      return next(ApiError.unauthorized('Unauthorized'))
    }
  }
}

module.exports = new UserController()