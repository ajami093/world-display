const express = require('express');
const https = require('https');
const bodyParse = require('body-parser');
const app = express();

app.use(bodyParse.urlencoded({extended: true}));

app.get('/', function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req,res){
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const appId = "d72c1f7c1efe5a34f6478ff8c5920ffe";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appId + "&units="+ units;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon + "@2x.png";
            var iconImgUrl = "http://openweathermap.org/img/wn/" + icon;
            console.log(temp);
            console.log(desc);
            res.write("<p>The weather is currently " + desc +"</p>");
            res.write("<h1>The temp in " + query +" is " + temp + "degress Celcius</h1>");
            res.write("<img src=" + iconImgUrl + ">");
            res.send();
        });

    });
});


app.listen(3000, function(){
    console.log("Server start on port 3000");
});