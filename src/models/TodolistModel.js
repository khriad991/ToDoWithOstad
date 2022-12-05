

const mongoose = require("mongoose")

const dataSchma = mongoose.Schema({
    userName: { type: String },
    todoSubject: { type: String },
    todoDescription: { type: String },
    todoStatus: { type: String, default: "New" },
    todoCreateDate: {type:Date},
    todoUpdateDate: {type:Date}
}, { versionKey: false })

const todoModel = mongoose.model("todoList", dataSchma)
module.exports = todoModel

