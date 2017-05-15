
var express = require('express');
var path = require('path');
var bodyParser=require('body-parser');
var app = express();


var userDetails = require('./controllers/storedetails');
var loginDetails = require('./controllers/retrivename');
var addpoints = require('./controllers/addpoints');
var transfer = require('./controllers/transfer');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.post('/api/details', userDetails.storedetails);
app.post('/api/login', loginDetails.retrivename);
app.post('/api/addpoints',addpoints.addpoints);
app.post('/api/transfer',transfer.transfer);


app.listen(3000,function(){
	console.log("app getting ready at port 3000")
});
