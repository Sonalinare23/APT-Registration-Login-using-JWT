const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err, hash)=>{
        if(err)
        {
            return res.status(500).json({
                error:err
            })
        }
        else
        {
            const user = new User({
            _id: new mongoose.Types.ObjectId,
            Username:req.body.Username,
            email:req.body.email,
            password:hash,
            confirm_pass:hash,

           })
           user.save()
           .then(result=>{
               res.status(200).json({
                   new_user:result
               })
           })
           .catch(err=>{
               res.status(500).json({
                   error:err
               })
           })
        }
    })
})

router.post('/login',(req,res,nex)=>{
    User.find({Username:req.body.Username})
    .exec()
    .then(user=>{
        if(user.length < 1)
        {
            return res.status(401).json({
            msg:'user not exist'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result)
            {
                return res.status(401).json({
                    msg:'password matching fail'
                })
            }
            if(result)
            {
               const token = jwt.sign({
                Username:user[0].Username, 
                email:user[0].email
               },
                 'this is dummy text ',
               {
                   expiresIn:"24h"
               }
               );
               res.status(200).json({
                   Username:user[0].Username,
                   email:user[0].email,
                   token:token
               })
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
        err:err
        })
    })

})



module.exports = router;