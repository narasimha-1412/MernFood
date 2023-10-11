const express=require('express')

const router=express.Router()

const User=require('../models/User')

const {body, validationResult} = require('express-validator')

// Encoding and decoding password
const bcrypt=require('bcryptjs')
const jwt= require('jsonwebtoken')
const jwtSecret="MynameisGokuAKAKakarot"


// signup
router.post('/createuser',[
    body('name').isLength({ min:5}),
    body('password','min len 5').isLength({ min:5}),
    body('email').isEmail()
    ],
    async(req,res)=>{

        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({erros:errors.array()})
        }

        //ecncryption
        const salt=await bcrypt.genSalt(10)
        let secPassword=await bcrypt.hash(req.body.password, salt)

        try{
            await User.create({
                // name:'Tony',
                // password:'tony123',
                // email:'tony@gmail.com',
                // location:'kachiguda'

                name:req.body.name,
                // password:req.body.password,
                password:secPassword,
                email:req.body.email,
                location:req.body.location
            })

            res.json({success:true});
            
        } catch(error){
            console.log(error)
            res.json({success:false});
        }
})

// login
router.post('/loginuser',[
    
    body('password','Incorrect password').isLength({ min:5}),
    body('email').isEmail()
    ],async(req,res)=>{

    try{
        let email=req.body.email
        let userData=await User.findOne({email:email})

        if(!userData){
            return res.status(400).json({erros:'Invalid credentials'})
        }

        //edcoding
        const pwdCompare=await bcrypt.compare(req.body.password, userData.password)

        if(!pwdCompare){
            return res.status(400).json({erros:'Invalid password'})
        }

        const data={
            user:{
                id:userData.id
            }
        }

        const authToken=jwt.sign(data, jwtSecret)

        res.json({success:true, authToken:authToken});


        // if(req.body.password!=userData.password){
        //     return res.status(400).json({erros:'Invalid password'})
        // }
        // res.json({success:true});

        
    } catch(error){
        console.log(error)
        res.json({success:false});
    }
})

module.exports=router;