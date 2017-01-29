// to include
var express = require('express')
var https = require('https')
var request = require('request')
var port = Number(process.env.PORT || 8080)
var app = express()
var bodyparser = require(body-parser)
app.use(bodyparser.urlencoded({
extended:true
}))
app.use(bodyparser.json())

//start
app.post('/webhook', function(request, response)
{
  console.log("yedava")
  if(request.body.result.action=="weather")
  {
  sendWeather(request,response);
  }
}
         
) //app.post

function sendMessage(text, response)
{
response.writeHead(200, {"Content-Type":"application/json"})
  var json = JSON.stringify({
    speech:text,
    source : "text"
  })
  response.end(json)
}

function sendWeather(request, response)
{
  console.log("WEATHER OCCHINDHI")
city= request.body.result.parameters["geo-city"]
  request({
    url:"api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=93e0f7faf62f96d54eb1d5caa28ed417",
    json:true
  }, function(error, res, body)
          {
    if(body!= null)
    {
    if(body.weather !=null)
    {
    if(body.weather[0].description!=null)
    {
    var weather= "Today, in" +body.city+ " the weather is" +body.weather[0].description+ " and the temperature is " +body.temp
    sendMessage(weather, response)
    }
    
    }
      
    }
  })
  
 
}
app.listen(port)
