var connection = require('./../config');
    
var items = require('../models/users');
           
 module.exports.retrivename = function(req,res){

        var User ={
            phone: req.body.phone,
            password: req.body.password
        }

       
        items.findOne({where:{phone: User.phone}}).then(function (data) {
            console.log(data);
            
                if (  data == null ){
                    res.json({
                        message: 'user with this phone number donot exist'
                    })
                    
                }else if( data.dataValues.password == User.password ){
                
                   var token = accessToken(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                        res.json({
                            message:'User login successful',
                            token: token,
                            balance: data.dataValues.points
                        }) 
                    items.update(
                              { access_token: token },
                              { where: { phone: User.phone } }
                            ).then(function(result) {
                        res.json({
                            message:'user token added'
                        })
                    }).catch(function(err) {
                        res.json({
                            message: 'error with access token'
                        })
                    });
        
                }
                else{
                    res.json({
                        message:'user password is wrong'
                    })
                }
        });
    }   

    function accessToken(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) 
            result += chars[Math.floor(Math.random() * chars.length)];
    return result;
    }
    