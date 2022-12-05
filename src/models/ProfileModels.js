

const mongoose = require("mongoose");

const dataSchma = mongoose.Schema({
        fristName: { type: String },
        lastName: { type: String },
        emailAddress: { type: String },
        mobileNumber: { type: String },
        city: { type: String },
        userName: {type:String,unique:true },  
        password: {type:String}
    }, { versionKey: false }
)

const profileModel = mongoose.model("profiles", dataSchma)

module.exports= profileModel