const jwt = require('jsonwebtoken')

const secret = 'OwO'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NzQ0OTI0OX0.rm9INbIJcDHZasCnVYYDGUT2Zg9e2ZVVk-kAIKIu68s'

function veryfyToken(token, secret){
  return jwt.verify(token,secret)
}


const payload = veryfyToken(token,secret)

console.log(payload)
