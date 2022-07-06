const mongoose = require("mongoose")
const {config} = require('dotenv')
config()
async function connect(uri){
   try{
    mongoose.connect(uri || process.env.MONGO_DB_LOCAL )
    console.log("connected to mongodb successfully")
   }catch(err){
    console.log(err)
   }
}

module.exports = connect