

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose  = require("mongoose");
require("dotenv").config();
app.use(express.json());
const User = require("./models/Users");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const jwtSecret = "wetyuijhgvbjkjhgfcvbhjmnb"



 mongoose.connect(process.env.MONGO_URL) 
// .then( ()=>{ console.log("connected")})
// .catch( (err)=>{ console.log(err)});
app.use(express.json());
app.use(cookieParser())


app.use(
  cors({
    origin: "http://127.0.0.1:5173", 
  })
);
 
app.get("/test", (req, res) => {
  res.json("Testing page");
});

app.post("/register", async (req, res) => {
    const {name, email,password, date} = req.body;
 const userDoc = await  User.create({
      name,
      email,
      password:bcrypt.hashSync(password,bcryptSalt ),
      date: new Date()
    });
    res.json(name, email, password, date)
    console.log(userDoc)
});


app.post("/login", async (req, res) => {
  const {email, password} = req.body;
  const userDoc = await User.findOne({email});
  if (userDoc){
  const passwordchecker = bcrypt.compareSync(password, userDoc.password)
  if (passwordchecker){
    jwt.sign({email: userDoc.email, id: userDoc._id},jwtSecret,{}, (err, token)=>{
      if (err) throw err;
      res.cookie("token", token).json("password ok")
      res.json("login success");
      
    } )
    res.cookie("token",token).json(userDoc)
    
  }
  else{
    res.status(422).json("password is incorrect")
  }
  }
  else { res.json("Not Found")
}

});


app.get("/profile", (req, res) => {
  const {token} = req.cookies
  res.json({token})
})


app.listen(3000, () => {
  console.log("listening on port 3000");
});


// GBfFxpugpKNcz0Vk
