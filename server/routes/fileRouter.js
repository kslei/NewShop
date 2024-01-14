const Router = require('express')
const router = new Router()
const fileController = require('../controllers/fileController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), fileController.createFile)
router.get('/', fileController.downloadFile)

module.exports = router