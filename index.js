import express from 'express'
import http from 'http'//http module,because we can use socket.io with express
import path from 'path'
import {Server} from 'socket.io'
import dotenv from 'dotenv';
dotenv.config()
const app=express(); //create express app

const server=http.createServer(app);//put express app in http server

const io=new Server(server); //http module will handle socket.io 
// two client tom and som and both are socket
io.on('connection',(socket)=>{
//get user-mess from client
  socket.on("user-mess",message=>{
    io.emit("from-server",message);//send to all clients

  })
  console.log("new user",socket.id)
})

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware

//The root argument specifies the root directory from which to serve static assets.

app.use(express.static(path.resolve("./public")))
app.get("/",(req,res)=>{
    return res.sendFile("./public/index.html")
  
})//& express will handle html file
const PORT= process.env.PORT|| 8000;

server.listen(PORT,()=>console.log(`server started at port :${PORT}`))

