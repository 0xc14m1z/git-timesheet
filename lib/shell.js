const shell = require("child_process").execSync

module.exports = command => shell(command).toString()
