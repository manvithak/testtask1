    var connection = require('./../config');
    
    
    //var user = require('./models/user');
           
    module.exports.storedetails = function(req,res){
        var today = new Date();
        var User={
            "name":req.body.name,
            "email":req.body.email,
            "dob":req.body.dob,
            "gender":req.body.gender,
            "token":null
        }
     connection.query('SELECT * FROM details WHERE email = ?',User.email, function(error, results, fields){
        if(error)
        {
            res.json({
                message:'error in query'
            })
        }
        else
        {
            console.log(User.email);
            //console.log(results[0].email);

            if (  results.length > 0 )
            {
                res.json({
                    message:'email alredy verified'
                })

            }
            else
            {
                function randomString(length, chars) {
                    var result = '';
                    for (var i = length; i > 0; --i) 
                        result += chars[Math.floor(Math.random() * chars.length)];
                    return result;
                    }
                var token = randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                console.log(token);

                User.token = token;
              connection.query('INSERT INTO details SET ?',User, function (error, results, fields) {
          if (error) {
            res.json({
                status:false,
                message:'there is some error with query'
            })
        }
   
        else{

              res.json({
                status:true,
                message:'user registered sucessfully'
            })
          }

        });
        
        }
        }
            
        }); 
     
        
        
        //connection.query('UPDATE details SET token = ?, WHERE email = ?', token,User.email, function(err, result) {});
    

}