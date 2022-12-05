const profileModel = require("../models/ProfileModels")
const jwt  = require('jsonwebtoken')

exports.createProfile = (req, res) => {
    let reqBody = req.body

    profileModel.create(reqBody, (err, data) => {
        
        if (err) {
            res.status(400).json({status:'Data Create fail', data:err})
        } else {
            res.status(200).json({status:"DaTa Create Success", data:data})
        }
    })
}

//? User Loging
exports.userLoging = (req, res) => {
    const UserName = req.body['userName']
    const password = req.body['password']

    profileModel.find({ username: UserName, password: password }, (err ,data) => {
        if (err) {
            res.status(400).json({status:"Fail",data: err})
        } else {
            if (data.length > 0) {
                
            //! Create Auth Token 
            let playload = { exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data:data[0]}
                let jwttoken = jwt.sign(playload, "ScerectKey123456789")
                
                res.status(200).json({status:"success", token:jwttoken,data:data})
            } else {
                res.status(401).json({status:"Unauthorize"})
            }
        }
    })
}
//! select Profile 
exports.selectProfile = (req, res) => {
    let userName = req.headers['userName']
    profileModel.find({ userName: userName }, (err, data) => {
        if (err) {
            res.status(400).json({status:'fail Profile model', data:err})
        } else {
            res.status(200).json({status:'success your Profile', data:data})
        }
    })
}

//! update Profile
exports.updateProfile = (req, res) => {
    let userName = req.headers['userName']
    let reqBody = req.body

    //! Which Profile can't UPdate  ??? That Proifle is loging & JWT Token match with userName
    profileModel.updateOne({ userName: userName }, { $set: reqBody }, { upsert: true }, (err, data) => {
        if (err) {
            res.status(400).json({status:"Data UpdataOne Fail", data:err})
        } else {
            res.status(200).json({status:"Data UpdateOne Success", data: data})
        }
    })
    
}