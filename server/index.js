require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')//запросы из браузера
const fileupload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')
const path = require('path')
const PORT = process.env.PORT || 5000
const i18next = require('i18next')
const Backend = require('i18next-node-fs-backend');

i18next
  .use(Backend)
  .init({
    fallbackLng: 'uk',
    debug: true,
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
    },
    whitelist: ['en', 'ru', 'uk'],
    supportedLngs: ['en', 'ru', 'uk'],
    preload: ['uk'],
  });

const app = express()

app.use((req, res, next) => {
  // This reads the querystring from frontend
  const {lng} = req.query
  // This reads the accept-language header
  if (lng) {
    req.lang = lng
  }

  i18next.changeLanguage(req.lang)
  next()
})

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'build')))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))

app.use('/api', router)

app.use(errorHandler)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync(/* { alter: true } */) // To update the database when the model changes
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()