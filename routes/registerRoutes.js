const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');

app.set("view engine", "pug");
app.set("views","views");

app.use(bodyParser.urlencoded({extended:false}));

router.get("/", (req, res, next)=>{
    
    res.status(200).render("register");
})

router.post("/", async (req, res, next)=>{
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;
    var payload = req.body;

    if(firstName && lastName && username && email && password){
        var user = await User.findOne({
            $or:[{username:username},{email:email}]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render("register", payload);
        });
        // checking if the user info is already in use
        if(user == null){
            //NO user found
            var data = req.body;//collect the data that input
            data.password = await bcrypt.hash(password,10);
            //using the userschema to create database table 
            User.create(data)
            .then((user) =>{
                req.session.user = user;
                return res.redirect("/");
            })
        }
        else{
            //User found
            if(email == user.email){
                payload.errorMessage = "Email.already in use.";
            }
            else{
                payload.errorMessage = "Username already in use.";
            }
            res.status(200).render("register", payload);
        }



    }
    else{
        payload.errorMessage = "Make sure each field has a valid value.";
        res.status(200).render("register",payload);
    }
})
module.exports = router;