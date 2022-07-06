const Tasks = require("../model/task")

//get all tasks
exports.getAllTasks = async(req, res)=>{
    try{
        let tasks = await Tasks.find()
        console.log(tasks)
        res.status(200).json({
            success:true,
            message:" tasks retrieved",
            tasks

        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"internal server error",
            tasks
        })
    }
}

// get single task

exports.getTask = async(req,res)=>{
    try {
        
        let id = {_id: req.params.id}
        console.log(id) 
        let task = await Tasks.findOne(id)
        console.log(task)
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "task doesn't exist"
            })
        }
        res.status(200).json({success:true, message: 'Task found',task:task})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

//create tast
exports.createTask = async(req,res)=>{
    try {
        let task = await req.body
        console.log(task)
        let created = await Tasks.create(task)
        console.log(task, created)
        if (!created) {
            return res.status(400).json({
                success: false,
                message: "Task creation failed"
            })
        }
        return res.status(201).json({
            success: true,
            message: "user created successfully",
            task: created
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server",
            error: error.message
        })
    }
}

//update task

exports.updateTask = async(req,res)=>{
    try {
        let id = {_id: req.params.id}
      let task = await req.body

    let update = await Tasks.findOneAndUpdate(id, task, {new:true})
    if(!update){
        return res.status(400).json({
            success:false,
            message: "Task not updated"
        })
    }
    return res.status(200).json({
        success:true,
        message: "Task updated",
        task: update
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server",
            error: error.message
        })
    }
}
//delete task

exports.deleteTask = async (req,res)=>{
    try {
        let id = {_id: req.params.id}
        let deleted = await Tasks.findOneAndRemove(id)
        if (!deleted) {
            return  res.status(400).json({
                success:false,
                message: "task not deleted"
            })
        }

        return res.status(200).json({success: true, message:"task deleted successfully"})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server",
            error: error.message
        })
    }
}