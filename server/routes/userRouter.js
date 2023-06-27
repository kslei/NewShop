const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const {userRegValidateChainMethod} = require('../validations/userRegValidations')
const {userLogValidateChainMethod} = require('../validations/userLogValidations')

router.post('/registration', userRegValidateChainMethod, userController.registration)//функция передается без скобок как объект
router.post('/login', userLogValidateChainMethod, userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router