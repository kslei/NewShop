const Router = require('express')
const router = new Router()
const frameController = require('../controllers/frameController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), frameController.create)
//router.get('/', frameController.getAll)
router.put('/', checkRole('ADMIN'), frameController.put)

module.exports = router 