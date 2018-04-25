const fileSystem = require('fs')

const save = (canvas, outputFilePath) => {
  const destination = fileSystem.createWriteStream(outputFilePath)
  canvas
    .pngStream()
    .pipe(destination)
}

module.exports = save
