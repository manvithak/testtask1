    var connection = require('./../config');
    var Joi = require('joi');
    var Sequelize = require('sequelize');
    
    var users = require('../models/users');
    var session = require('express-session');

    //var sess;
    
    module.exports.storedetails = function(req,res){
      //sess=req.session;
        
        var User={
            phone: req.body.phone,
            password: req.body.password,
            f_name: req.body.first_name,
            l_name: req.body.last_name,
            dob: req.body.dob,
            gender: req.body.gender,
            
           
        }
        var phone = User.phone;
        var f_name = User.f_name;
        var l_name = User.l_name;
        var dob = User.dob;
        var d = new Date();
        var age = getAge(dob);
        //var a = Joi.number().validate(phone);
        console.log(age);
        
       var schema = {
                  phone: Joi.string().regex(/[0-9]/, phone).length(10).required(),
                  f_name: Joi.string().regex(/^\S+$/, f_name).min(2).required(),
                  l_name: Joi.string().regex(/^\S+$/, l_name).min(2).required(),
                };

            console.log(Joi.validate(phone, schema.phone));
                  
        if( (Joi.validate(phone, schema.phone)).error ){
            res.json({
              message:'phone number should be in numbers of exactly 10 digits'
            })
        }
        else if( (Joi.validate(f_name, schema.f_name)).error ){
          res.json({
            message:'first name must have atleast 2 chars without spaces'
          })
        }
        else if( (Joi.validate(l_name, schema.l_name)).error ){
          res.json({
            message:'last name must have 2 characters without spaces'
          })
        }
        else if( age < 20){
          res.json({
            message:'user age should be 20'
          })
        }
        else{
                  
                
      
        users.findAll({where:{phone: User.phone}}).then(function (data) {
           
                console.log(User.phone);
                

                if (  data.length > 0 ){
                res.json({
                    message:'User with this phone number already exists'
                })

                }else{
                
                
                        users.create({
                           phone: User.phone,
                           password: User.password,
                           first_name: User.f_name,
                           last_name: User.l_name,
                           dob: User.dob,
                           gender: User.gender,
                           points: 0
                           
                        }).then(function (task) {
                        console.log(task.values);
                        task.save();
                        res.json({
                          message: 'user registered successfully'
                          })
                       })
                    }
              
        });
  
    
     }
        
    }  

    function getAge(dob) 
                  {
                      var today = new Date();
                      var birthyear = dob.substr(0,4);
                      var age = today.getFullYear() - birthyear;
                      
                      return age;
                  }     
        
