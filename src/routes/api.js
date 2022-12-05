
const express = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const profileController = require("../controller/profileController.js")
const todolistController = require('../controller/todoListController')
const authVeryfyMiddleWare = require('../middleware/authVeryfyMiddleware')
const router = express.Router();

//? user singUP
router.post('/createProfile',profileController.createProfile)

//? user LogIN
router.post('/userLoging', profileController.userLoging);

//? selsct Profile
router.get('/selectProfile', authVeryfyMiddleWare, profileController.selectProfile);

//? update Profile 
router.post('/updateProfile', authVeryfyMiddleWare, profileController.updateProfile);

//TODOLIST Create for DataBase
router.post('/creteTodo', authVeryfyMiddleWare, todolistController.creteTodo);
router.get('/selectTodo', authVeryfyMiddleWare, todolistController.selectTodo);
router.post("/updateTodo", authVeryfyMiddleWare, todolistController.updateTodo);
router.post("/updateStatusTodo", authVeryfyMiddleWare, todolistController.updateStatusTodo);
router.post("/removeTodo", authVeryfyMiddleWare, todolistController.updateStatusTodo);
router.post("/selectTodoStatus", authVeryfyMiddleWare, todolistController.selectTodoStatus)
router.post('/selectTodoByData', authVeryfyMiddleWare, todolistController.selectTodoByData)

//! exports for  app.js
module.exports = router;