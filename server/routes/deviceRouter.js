const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')
const { deviceValidateChainMethod } = require('../validations/deviceValidations')

router.post('/', checkRole('ADMIN'), deviceValidateChainMethod, deviceController.create)
router.post('/info', checkRole('ADMIN'), deviceController.createInfo)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.put('/', checkRole('ADMIN'), deviceValidateChainMethod, deviceController.put)

module.exports = router 