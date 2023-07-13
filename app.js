
const express = require("express");
 const https = require("https");
 const bodyParser = require("body-parser")

 const aap = express();
 aap.use(bodyParser.urlencoded({extended:true}));
aap.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
    


})
aap.post("/",function(req,res){
    const name = req.body.cityName;
        const query = name;
    const apikey = "*************"
    const units = "metric"
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=" + units;
    https.get(url,(response)=>{
        console.log(response);
        console.log(response.statusCode);
        response.on("data",(data)=>{
            const weather = JSON.parse(data);
            console.log(weather);
            const main = weather.main;
            console.log(main);
            const temp = weather.main.temp;
            console.log(temp);
            const feels_like = weather.main.feels_like;
            console.log(feels_like);
            const description = weather.weather[0].description;
            console.log(description);
            const image = weather.weather[0].icon
            const imgurl = "https://openweathermap.org/img/wn/" + image + "@2x.png"
            // res.send(`<h1>The  temp in London is ${temp} degree cel.</h1> <br> <h1>Weather Discription :- ${description}</h1>`);
            res.write(`<h1>The  temp in ${query} is ${temp} degree cel.</h1>`)
            res.write(`<p>Weather Discription :- ${description}</p>`)
            res.write("<img src =" +imgurl+ ">");
            res.send();
            // const object = {
            //     name1 : "Shashwat",
            //     Role : "Software Developer"
            // }
            // const obj = JSON.stringify(object)
            // console.log(obj);
        })
    })

})


 
 aap.listen(3000,()=>{
    console.log("Server is running on port = 3000");
 })