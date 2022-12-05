const { reset } = require("nodemon");
const todoListModel = require("../models/TodolistModel")

//? Createing ToDo Data

exports.creteTodo = (req, res) => {
    let reqBody = req.body
    let todoSubject = reqBody["todoSubject"];
    let todoDescription = reqBody["todoDescription"]
    let useName = req.headers["userName"]
    let todoStatus = "New";
    let todoCreateDate = Date.now();
    let todoUpdateDate = Date.now()

    let postBody = {
         userName:useName,
         todoSubject:todoSubject,
         tododescription:todoDescription,
         todoStatus: todoStatus,
         todoCreateDate: todoCreateDate,
         todoUpdateDate: todoUpdateDate
    }
    todoListModel.create(postBody, (err, data) => {
        if (err) {
            res.status(400).json({status:"todo Data Create Fail", data: err})
        } else {
            res.status(200).json({status:"todo Data Create Success", data:data})
        }
    })
}


//? Select ToDo
exports.selectTodo = (req, res) => {
    let userName = req.headers['userName']

    todoListModel.find({ username: userName }, (err, data) => {
        if (err) {
            res.status(400).json({status:"Data Select Fail",data:err})
        } else {
            res.status(200).json({status:"Data Select Success", data:data})
        }
    })
}

//? todo Updata
exports.updateTodo = (req, res) => {
    let todoSubject = req.body["todoSubject"];
    let todoDescription = req.body["todoDescription"];
    let update_id = req.body['_id'];
    let todoUpdateDate = Date.now();

    let postBody = {
        todoSubject: todoSubject,
        todoDescription: todoDescription,
        todoUpdateDate: todoUpdateDate
    }
    todoListModel.updateMany({ id:update_id}, { $set: postBody }, { upsert: true }, (err, data) => {
        if (err) {
            res.status(400).json({status:"todo Update Fail", data:err})
        } else {
            res.status(200).json({status:"todo Data Update Success ", data:data})
        }
    } )
}

//? update Status Todo -----------

exports.updateStatusTodo = (req, res) => {
    let todoStatus = req.body["todoStatus"];
    let _id = req.body["_id"];
    let todoUpdateDate = Date.now();

    let postBody = {
        todoStatus: todoStatus,
        _id: _id, 
        todoUpdateDate: todoUpdateDate
    }
    todoListModel.updateOne({ _id: _id },{ $set: postBody }, { upsert: true },(err, data) => {
            if (err) {
                res.status(400).json({status:"toto Status update Fail", data: err})
            } {
                res.status(200).json({status:"todo Status update Success", data:data})
            }
        })
}

//? Delete todo
exports.removeTodo = (req, res) => {
    let _id = req.body["_id"]
    todoListModel.remove({ _id: _id }, (err, data) => {
        if (err) {
            res.status(400).json({status:"todo data remove Fail",data:err})
        } else {
            res.status(200).json({status:"todo data romove Success",data:data})
        }
        
    })
}

//? Select Todo By Status

exports.selectTodoStatus = (req, res) => {
    let userName = req.body["userName"];
    let todoStatus = req.body["todoStatus"];

    todoListModel.find({ useName: userName, todoStatus: todoStatus }, (err, data) => {
        if (err) {
            res.status(400).json({ status:"todoStatus find Fail", data:err})
        } else {
            res.status(200).json({status:"todoStatus find Success ", data:data})
        }
    })

}

exports.selectTodoByData = (req, res) => {
    let userName = req.headers["userName"];
    let FormDate = req.body["FormDate"]
    let ToDate = req.body["ToDate"]

    let condition = { userName: userName, todoCreateDate: { $gte: new Date(FormDate) }, todoUpdateDate: { $lte: new Date(ToDate) } }
    
    todoListModel.find( condition, (err, data) => {
            if (err) {
                res.status(400).json({status:"selectTodoByData data find Fail", data:err})
            } else (
                res.status(200).json({status:"selectTodoByData Data find Success" , data:data})
            )
    })
}