const express = require('express');
const bodyParse = require('body-parser');
const request = require('request');
const https = require('https');
const { PassThrough } = require('stream');

const app = express();
app.use(bodyParse.urlencoded({extended: true}));
app.use(express.static("public"))

app.get('/', function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req,res){
    const fn = req.body.FirstName
    const ln = req.body.LastName
    const email = req.body.Email
    
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fn,
                    LNAME: ln,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const list_id = '6f0a303f3a'
    // Look at API-key and at the end it tells you the server
    // your account is assigned to
    const mailchimp_server = 'us14'
    const url = 'https://'+mailchimp_server+'.api.mailchimp.com/3.0/lists/'+list_id
    const options = {
        method: 'POST',
        auth: "adham1:b47623713e4493e0c2af0a75dd6b278e-us14"
    }

    const request = https.request(url, options, function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on('data', function(data){
            // My way of checking if something failed
            // const memberData = JSON.parse(data);
            // if (memberData.error_count > 0) {
            //     res.write('<h1>FAILURE</h1>');
            //     res.write('<p>'+memberData.errors[0].error+'</p>')
            // }else{
            //     res.write('<h1>SUCCESS</h1>');
            // }
            // res.send();
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
    console.log(fn, ln, email);
});

app.post('/failure', function(req, res){
    res.redirect('/');
});

app.listen(3000, function(){
    console.log('Server running on port 3000');
});

// API Key
// b47623713e4493e0c2af0a75dd6b278e-us14

//Audience ID
//6f0a303f3a