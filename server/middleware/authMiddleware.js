const jwt = require('jsonwebtoken')
const i18next = require('i18next')

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
    if (!token) {
      return res.status(401).json({ message: `${i18next.t("Not authorized")}` })
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: `${i18next.t("Not authorized")}` })
  }
};