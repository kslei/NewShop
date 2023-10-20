const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const LangController = require('../controllers/langController')

router.put('/', checkRole('ADMIN'), LangController.update)
router.get('/', LangController.get)
//router.delete('/', checkRole('ADMIN'), langController.remove)

module.exports = router