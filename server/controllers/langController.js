const fs = require('fs');
const path = require('path');
var express = require('express');
var router = express.Router();
const i18next = require('i18next');
const ApiError = require('../error/ApiError');


class langController {
  get(req, res, next) {
    const {lng, key, value} = req.query
    try {
      /* if(i18next.language !== lng) {
      i18next.changeLanguage(lng) */
      const locale = fs.readFileSync(path.resolve(__dirname, '..', 'locales', lng, 'translation.json'))
      let parsedlocale = JSON.parse(locale);
      const resp = []
      if (key && key.length !== 0) {
        key.forEach(element => {
          const data = {}
          if(element in parsedlocale) {
            data.key = element
            data.value = parsedlocale[element]
            //data[element] = parsedlocale[element]
          }
          if(element && element in parsedlocale !== true) {
            data.key = element
            data.value = ""
            //data[element] = ""
          }
          resp.push(data)
        });
        return res.json(resp)
      }
      if (!key || key.length === 0 && value) {
        const entries = Object.entries(parsedlocale);
        const data = {}
        entries.forEach(([k, v]) => {
          if (v === value) {
            data.key = k;
            data.value = v;
          }
        })
        return res.json(data)
      }
      
      return res.json(parsedlocale)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
    
  }

  async update(req, res, next) {
    try {
      const {lng, key, value} = req.body
      let locale = fs.readFileSync(path.resolve(__dirname, '..', 'locales', lng, 'translation.json'))
      let parsedlocale = JSON.parse(locale);
      parsedlocale[key] = value
      //console.log('LOCALE', parsedlocale)
      let data = JSON.stringify(parsedlocale, null, 2)
      fs.writeFileSync(path.resolve(__dirname, '..', 'locales', lng, 'translation.json'), data);
      let resp = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'locales', lng, 'translation.json')))

      return res.json(resp[key])
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
    
  }
}

module.exports = new langController()