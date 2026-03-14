const crypto = require('crypto')
require('dotenv').config

const secrete_key = process.env.SECRETE_KEY
const algorithm = 'aes-256-cbc'

function decrypt(hash){
    const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(secrete_key),
        Buffer.from(hash.iv,'hex')
    )
    let decrypted = decipher.update(
        Buffer.from(hash.content,'hex')
    )
    decrypted = Buffer.concat([decrypted,decipher.final()])

    return decrypted.toString()
}

module.exports=decrypt