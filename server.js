const http = require("http");
const app = require('./app/app')
require('./config/dbConnect')
require('dotenv').config()

const PORT = process.env.PORT || 2023

//creating server
const server = http.createServer(app)



server.listen(PORT, () => console.log(`Server is running ${PORT}`))
