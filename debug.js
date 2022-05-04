const shell = require('shelljs')

console.log('Dir: ', shell.ls().toString('utf8').split(',').join('\n'))
