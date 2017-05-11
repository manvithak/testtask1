var User={
        "name":req.body.user_name,
        "email":req.body.user_email,
        "dob":req.body.user_date,
        "gender":req.body.user_gender,
        "token":null
    }



module.exports = User;