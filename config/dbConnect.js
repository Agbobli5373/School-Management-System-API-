const mongoose = require('mongoose')
require('dotenv').config()

//DB Connection
const dbConnect = async () => {
    try{
        await mongoose.set('strictQuery', false) 
        await mongoose.connect(process.env.MONGO_URL)
         console.log('DB connected Successfully')
    }
    catch(error){

          console.log('DB connection Failed', error.message)
    }
}

dbConnect()