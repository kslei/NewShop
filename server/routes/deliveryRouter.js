const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const deliveryController = require('../controllers/deliveryController')
const { deliveryValidateChainMethod } = require('../validations/deliveryValidations')

router.post('/', checkRole('ADMIN'), deliveryValidateChainMethod, deliveryController.create)
router.get('/', deliveryController.getAll)
router.delete('/', checkRole('ADMIN'), deliveryController.remove)

module.exports = router