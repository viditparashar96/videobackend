require('dotenv').config()
const experss=require("express")
const app=experss()
const cors=require("cors")
http = require('http')
const {Server}=require("socket.io")
app.use(cors())
app.use(experss.json())
const server=http.createServer(app)
const { v4: uuidv4 } = require('uuid');
const PORT=process.env.PORT || 4000
const io =new Server(server, {
    cors: {
      origin: 'https://videofrontend-2a9gqamj4-viditsharma69.vercel.app', // Update with your React app's origin
      methods: ['GET', 'POST'],
    },
  });

io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("join-room",(ROOM_ID,peerid)=>{
        console.log(ROOM_ID)
        console.log("peer ID is:"+peerid)

        socket.join(ROOM_ID)
        socket.to(ROOM_ID).emit("userconnected",peerid)
    })
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
});


app.get("/",(req,res)=>{
    res.send("home page")
})
app.get("/join",(req,res,next)=>{
    res.json({
        data:uuidv4()
    })
})


server.listen(PORT,()=>console.log("Server started at port 4000"))