const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    let tokennKey = req.headers['token-key']

    jwt.verify(tokennKey, "ScerectKey123456789", (err, decode) => {
        if (err) {
            res.status(400).json({ status: "tokenKey is't match ", data: err });
        } else {

            //!  get user name  form decode token & add headers 
            let username = decode["data"]['userName']
            req.headers.userName = username
            next();
        }
    })
}