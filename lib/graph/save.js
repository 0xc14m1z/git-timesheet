const fileSystem = require('fs')

const save = (pdf, outputFilePath, callback) => {
  pdf.getBuffer(buffer => {
    fileSystem.writeFile(outputFilePath, buffer, callback)
  })
}

module.exports = save
