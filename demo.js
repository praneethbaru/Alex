// to include
var express = require('express')
var https = require('https')
var request = require('request')
var port = Number(process.env.PORT || 8080)
var app = express()

//start
app.get('/home', function(request, response)
{
console.log("yedava")
}
) 
app.listen(port)
