const path = require('path')
const fs = require('fs')
const ApiError = require('../error/ApiError')

class FileController {
  async createFile(req, res, next) {
    try {
      const {file} = req.files
      const fileName = 'android.apk'
      file.mv(path.resolve(__dirname, '..', 'static', fileName))//переместить файл
      return res.json({ message: "The file is recorded" })
    } catch (error) {
      next(ApiError.badRequest(e.message))
    }
  }

  async downloadFile(req, res, next) {
    const fileName = 'android.apk'
    const Path = path.resolve(__dirname, '..', 'static', fileName)
    if(fs.existsSync(Path)) {
      return res.download(Path, fileName)
    }
    return res.status(400).json({ message: "Download error" })
  }
}

module.exports = new FileController()