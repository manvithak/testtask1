var connection = require('./../config');
    
    var Sequelize = require('sequelize');
    
    var users = require('../models/users');

    module.exports.transfer = function(req, res){
    	var transfer = {
    		access_token: req.body.token,
    		phone: req.body.phone,
    		amount: req.body.amount
    	}
    	users.findOne({where:{access_token: transfer.access_token}}).then(function(data){
    		console.log(data);
    		console.log(data.dataValues.points);
    		if( data != null ){
    			if(data.dataValues.points >= transfer.amount){
    				users.findOne({where:{phone: transfer.phone}}).then(function(result){
    					if( result != null ){
    						users.update({points: result.dataValues.points + transfer.amount},
    							{where:{phone: transfer.phone}}).then(function(result){
    								res.json({
    									message:'transfer success'
    								})
    							}).catch(function(err){
    								res.json({
    									message:'error in transfer'
    								})
    							});
    						}
    					else{
    						res.json({
    							message:'person not registered'
    						})
    					}
    				})
	    			users.update({points: data.dataValues.points - transfer.amount},
	    			{where:{access_token: transfer.access_token}}).catch(function(err){
	    				res.json({
	    					message:'error in updation'
	    				})
	    			})	
    			}else{
    				res.json({
    					message:'no sufficient amount in users wallet'
    				})
    			}
    		}else{
    			res.json({
    				message:'error in token'
    			})
    		}
    	});
    }