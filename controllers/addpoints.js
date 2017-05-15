var connection = require('./../config');
var api_key = 'sk_test_XMNNSykVep2aCyyOCPSuAHgt';  // secret stripe API key
var stripe = require('stripe')(api_key);
var Sequelize = require('sequelize');
var users = require('../models/users');
var details = require('./storedetails');



module.exports.addpoints = function(req,res){
	var sess = req.session;
var Card={
            exp_month: req.body.month,
            exp_year: req.body.year,
            number: req.body.card_number,
            amount: req.body.amount,
            cvv: req.body.cvv,
            token: req.body.token
        }
var d = new Date();
var year = d.getFullYear();
var month = d.getMonth();
console.log(month);
if(Card.exp_month > 12){
	res.json({
		message:'Not a valid month'
	})
}else if( Card.exp_year < year ){
	res.json({
		message:'Not valid year'
	})
}else if( Card.exp_year == year && Card.exp_month < month + 1){
	res.json({
		message:'enter valid month and year'
	})

}else{        
users.findOne({where:{access_token: Card.token}}).then(function (data) {
	console.log(data);
	if(data){
		stripe.tokens.create({
		  card: {
		    "number": Card.number,
		    "exp_month": Card.exp_month,
		    "exp_year": Card.exp_year,
		    "cvc": Card.cvv
		  }
		}, function(err, token) {

		  console.log(token);
		  if(err){
		  	res.json({
		  		message:'error in transaction'
		  	})
		  }
		  stripe.charges.create({
		  amount: Card.amount,
		  currency: "usd",
		  source: token.id 
		  
		},function(err, charge) {
		  console.log(err);
		  console.log(charge);
		  if(err){
		  	res.json({
		  		message: 'error in transaction'
		  	})
		  }
		  	else
		  	{				
			users.update({ points: data.dataValues.points + parseInt(Card.amount) },
		       { where: { access_token: Card.token } }
		            ).then(function(result) {
		        res.json({
		            message:'points added to the wallet'
		        })
		        }).catch(function(err) {
		            res.json({
		                message: 'error with access token'
		            })
		        });	
		  	}
		  });


		});
	}else{
		res.json({
			message:'token not found'
		})
	}

});
}
}
