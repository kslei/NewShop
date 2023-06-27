const Router = require('express')
const router = new Router()
const mailController = require('../controllers/mailController')
const checkRole = require('../middleware/checkRoleMiddleware')
const { mailValidateChainMethod } = require('../validations/mailValidations')

router.post('/', checkRole('ADMIN'), mailValidateChainMethod, mailController.post)

module.exports = router