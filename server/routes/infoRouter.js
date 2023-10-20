const Router = require('express')
const router = new Router()
const infoController = require('../controllers/infoController')

router.get('/', infoController.getAll)

module.exports = router 