
var express = require('express');
var path = require('path');
var bodyParser=require('body-parser');
var app = express();
var userDetails = require('./controllers/storedetails');
var verifyByUrl = require('./controllers/retrivename')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.post('/api/details',userDetails.storedetails);
app.post('/api/username/:token', verifyByUrl.retrivename);


app.listen(8081,function(){
	console.log("app getting ready at port 8081")
});
