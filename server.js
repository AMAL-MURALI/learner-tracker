const express=require('express');
const dotenv = require('dotenv');
const morgan =require('morgan');
const bodyparser=require('body-parser')
const path=require('path');
const cors = require('cors')
const connectDB=require('./server/database/connection')

const app =express();


dotenv.config({path:'config.env'})
const PORT = process.env.PORT||8080


module.exports=connectDB
//log request
app.use(morgan('tiny'));
app.use(cors());
//mongodb connection
connectDB();

//request to bodyparser
app.use(bodyparser.urlencoded({extended:true}))
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(bodyparser.json());
// app.set("views",path.resolve(__dirname,''))

//set view engine

//load routers
app.use(express.static(path.join(__dirname, 'frontend','build')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname,'frontend', 'build', 'index.html'));
});
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});
