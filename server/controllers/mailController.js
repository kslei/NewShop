require('dotenv').config
const nodemailer = require('nodemailer');
const ApiError = require('../error/ApiError')
const { validationResult } = require('express-validator')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

class MailController {
  async post (req, res, next) {
    //validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    try {
      const {email, message} = req.body
      const mailOptions = {
        from: 'mystoretesting0408@gmail.com',
        to: email,
        subject: 'Заказ',
        text: message
      }
      const data = await transporter.sendMail(mailOptions)
      return res.json(data)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
    
  }
}

module.exports = new MailController()