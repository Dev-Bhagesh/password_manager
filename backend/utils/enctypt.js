const crypto = require('crypto')
require('dotenv').config

const algorithm = 'aes-256-cbc'
const secrete_key = process.env.SECRETE_KEY

function encrypt(password){
    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(
        algorithm,
        Buffer.from(secrete_key),
        iv
    )
    let encrypted = cipher.update(password)
    encrypted = Buffer.concat([encrypted,cipher.final()])

    return{
        iv : iv.toString('hex'),
        content:encrypted.toString('hex')
        }
}

module.exports = encrypt