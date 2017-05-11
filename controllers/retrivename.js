var connection = require('./../config');
    
    //var user = require('./models/user');
           
    module.exports.retrivename = function(req,res){

    	var token = req.params.token;
    	connection.query('SELECT * FROM details WHERE token = ?',token, function(error, results, fields){
    		if(error){
    				res.json({
    					message:'error in query'
    				})
    		}
    		if(results.length == 0){
    			res.json({
    				message:'No user registered with this token'
    			})
    		}
    			else{
    				res.json({
    					message: 'User registered with this token'
    				})
    			}
    		

    	});
  
    }