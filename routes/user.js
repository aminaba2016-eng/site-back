const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const {loginRules,registerRules,validation} = require("../middleware/validator")
const isAuth = require("../middleware/passport")
// router.get("/",(req, res) =>{
//     res.send("hello");
// })

//rigester
router.post("/register", registerRules(),validation, async (req,res)=>{
    const { name,lastName,email,password }=req.body;
try{//save the user
    const newUser = new User({name,lastName,email,password})
    //check if the mail exist
    const searchedUser = await User.findOne({email})

    if(searchedUser){
        return res.status(400).send({ msg: "email already exist"})
    }
//     //ADmin
// router.get('/api/isadmin', function (req, res) {
//   User.findById(req.user, function (err, user) {
//     if (req.user.isAdmin == true) {
//         res.send(user);
//     } else {
//         return res.status(400).send({ message: 'User is not Admin' });
//     }
//   });
// });


    //hash password
    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    console.log(hashedPassword);
    newUser.password = hashedPassword;
    
    //save the user
   const newUserToken =  await newUser.save();
    //generate a token
    const payload = {
        _id: newUserToken._id,
        name: newUserToken.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
        expiresIn:3600,
    });
    console.log(token)
    res.status(200).send({user:newUserToken, msg: "user is saved", token:`Bearer ${token}`});
    }catch(error){
    res.status(500).send(console.log(error))
    }
})
//login
router.post("/login",loginRules(),validation, async (req,res) =>{
    //admin
    // if (User.isAdmin == true) {
    //     res.send(user);
    // } else {
    //     return res.status(400).send({ message: 'User is not Admin' });
    // }
const {email,password} = req.body

    try{
        //find  if the user exist
        const searchedUser = await User.findOne({ email }); 
        //if the mail not existt
        if(!searchedUser){
            return res.status(400).send({msg: "bad credential"})
        }
        //password are equals
        const match = await bcrypt.compare(password,  searchedUser.password) 
        if(!match){
            return res.status(400).send({ msg: "bad credential"})
        }
        //cree un token
        const payload = {
            _id: searchedUser._id,
            name: searcgedUser.name,
        };
        const token = await jwt.sign(payload, process.env.SecretOrKey, {
            expiresIn:3600,
        });
        //send the user
        res.status(200).send({user:searchedUser, msg: "success", token: `Bearer ${token}`})
    }catch(error){
        res.status(500).send({ msg: "cann not get the user"});

    }
})

router.get("/current", isAuth(),(req,res)=>{
    res.status(200).send({user:req.user
    })
   
})
module.exports = router;