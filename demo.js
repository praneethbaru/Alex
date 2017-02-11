// to include
var express = require('express')
var https = require('https')
var request = require('request')
var port = Number(process.env.PORT || 8080)
var app = express()
var bodyparser = require('body-parser')
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
  else if(request.body.result.action=="books")
  {
  sendBooks(request,response);
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

function sendGenericMessage(body,response,weather)
{
 var img="http://www.omgubuntu.co.uk/wp-content/uploads/2013/12/Flat-Weather-Icon-Set.png"
 console.log(img)
response.writeHead(200, {"Content-Type":"application/json"})
  var json = JSON.stringify({
   data:{
   "facebook": {
    "attachment": {
      "type": "template",
      "payload": {
      "template_type":"generic",
        "elements":[
           {
            "title":"Weather in "+body.name,
            "image_url":img,
            "subtitle":weather
           }//element
           ]//element
      }//payload
      }//attachment
    }//facebook
   },//data
    source : "text"
  })//json
  response.end(json)
}//function

function sendWeather(req, response)
{
  console.log("WEATHER OCCHINDHI")
city= req.body.result.parameters["geo-city"]
  request({
    url:"http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=93e0f7faf62f96d54eb1d5caa28ed417",
    json:true
  }, function(error, res, body)
          {console.log(city)
           if(!error)
           {
    if(body!= null)
    {console.log("Into body")
    if(body.weather !=null)
    {console.log("Into body.weather")
    if(body.weather[0].description!=null)
    {console.log("into desc too")
    var weather= "Today, in " +body.name+ " the weather is " +body.weather[0].description+ " and the temperature is " +body.main.temp
    sendGenericMessage(body, response, weather)
    }
    }  
    }
           }//error
           else
           console.log(error)
  }
         ) 
}

function sendBooks(req, response)
{
  console.log("Book OCCHINDHI")
book_query = req.body.result.resolvedQuery
  if(book_query.includes("#books"))
  {
  book_query = book_query.replace("#books","")
  }
  else if(book_query.includes("Tell me about the book named"))
  {
  book_query = book_query.replace("Tell me about the book named","")
  }
  
  
     
  request({
    url:"https://www.googleapis.com/books/v1/volumes?q="+book_query,
    json:true
  }, function(error, res, body)
          {
           if(!error)
           {
    if(body!= null)
    {
    sendListMessage(body, req, response)
    }
           }//error
           else
           console.log(error)
  }
         ) 
}

function sendListMessage(body, req, response)
{
var img="http://www.omgubuntu.co.uk/wp-content/uploads/2013/12/Flat-Weather-Icon-Set.png"
 console.log(img)
response.writeHead(200, {"Content-Type":"application/json"})
  var stri = "author : " + body.items[0].volumeInfo.authors[0]+ "/nCategory: "  + body.items[0].volumeInfo.categories[0] +"/nRating: " + body.items[0].volumeInfo.averageRating
  console.log(stri)
  var json = JSON.stringify({
   data:{
   "facebook": {
   "attachment": {
        "type": "template",
        "payload": {
            "template_type": "list",  
          "elements": [
                {
                    "title": body.items[0].volumeInfo.title,
                    "image_url": "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
                    "subtitle": stri,
                    "buttons": [
                        {
                            "title": "View",
                            "type": "web_url",
                            "url": "http://books.google.co.in/books/reader?id=wrOQLV6xB-wC&hl=&printsec=frontcover&output=reader&source=gbs_api",
                            "messenger_extensions": true,
                            "webview_height_ratio": "tall",
                            "fallback_url": "https://peterssendreceiveapp.ngrok.io/"                        
                        }
                    ]
                },
               {
                    "title": "Classic White T-Shirt",
                    "image_url": "https://peterssendreceiveapp.ngrok.io/img/white-t-shirt.png",
                    "subtitle": "100% Cotton, 200% Comfortable",
                    "default_action": {
                        "type": "web_url",
                        "url": "https://peterssendreceiveapp.ngrok.io/view?item=100",
                        "messenger_extensions": true,
                        "webview_height_ratio": "tall",
                        "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                    },
                    "buttons": [
                        {
                            "title": "Shop Now",
                            "type": "web_url",
                            "url": "https://peterssendreceiveapp.ngrok.io/shop?item=100",
                            "messenger_extensions": true,
                            "webview_height_ratio": "tall",
                            "fallback_url": "https://peterssendreceiveapp.ngrok.io/"                        
                        }
                    ]                
                },
     /*
                {
                    "title": "Classic Blue T-Shirt",
                    "image_url": "https://peterssendreceiveapp.ngrok.io/img/blue-t-shirt.png",
                    "subtitle": "100% Cotton, 200% Comfortable",
                    "default_action": {
                        "type": "web_url",
                        "url": "https://peterssendreceiveapp.ngrok.io/view?item=101",
                        "messenger_extensions": true,
                        "webview_height_ratio": "tall",
                        "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                    },
                    "buttons": [
                        {
                            "title": "Shop Now",
                            "type": "web_url",
                            "url": "https://peterssendreceiveapp.ngrok.io/shop?item=101",
                            "messenger_extensions": true,
                            "webview_height_ratio": "tall",
                            "fallback_url": "https://peterssendreceiveapp.ngrok.io/"                        
                        }
                    ]                
                },
                {
                    "title": "Classic Black T-Shirt",
                    "image_url": "https://peterssendreceiveapp.ngrok.io/img/black-t-shirt.png",
                    "subtitle": "100% Cotton, 200% Comfortable",
                    "default_action": {
                        "type": "web_url",
                        "url": "https://peterssendreceiveapp.ngrok.io/view?item=102",
                        "messenger_extensions": true,
                        "webview_height_ratio": "tall",
                        "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                    },
                    "buttons": [
                        {
                            "title": "Shop Now",
                            "type": "web_url",
                            "url": "https://peterssendreceiveapp.ngrok.io/shop?item=102",
                            "messenger_extensions": true,
                            "webview_height_ratio": "tall",
                            "fallback_url": "https://peterssendreceiveapp.ngrok.io/"                        
                        }
                    ]                
                }
            ],
             "buttons": [
                {
                    "title": "View More",
                    "type": "postback",
                    "payload": "payload"                        
                }*/
            ]  
        }
    }//attachment
    }//facebook
   },//data
    source : "text"
  })//json
  console.log(json)
  response.end(json)
}

app.listen(port)
