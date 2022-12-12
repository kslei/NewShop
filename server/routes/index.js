const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const deviceRouter = require('./deviceRouter')
const ratingRouter = require('./ratingRouter')
const orderRouter = require('./orderRouter')
const mailRouter = require('./mailRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/rating', ratingRouter)
router.use('/order', orderRouter)
router.use('/mail', mailRouter)

module.exports = router