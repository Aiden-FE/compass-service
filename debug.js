const shell = require('shelljs')
// console.log('debug env: ',
//     process.env.DATABASE_URL,
//     process.env.ALI_CLOUD_SMS_ACCESS_KEY_ID,
//     process.env
// )

const catData = shell.cat('.env').toString('uat8')
console.log('Debug: ', catData, shell.ls('-a').toString('uat8'))
