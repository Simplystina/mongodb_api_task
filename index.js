const express = require("express");
const connect = require('./config/database')
const taskRouter = require('./router/tasksRouter')
const {json} = require('express')

const app = express()
app.use(json());
app.use("/tasks", taskRouter)

connect()
const PORT = process.env.PORT ||5000


app.listen(PORT, ()=>console.log(`Serving on port ${PORT}`))

