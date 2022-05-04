const shell = require('shelljs')

console.log(shell.pwd().toString())
console.log(shell.ls().toString().split(',').join('\n'))
