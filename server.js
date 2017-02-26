const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const app = express()
const port = process.env.PORT || 8080

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.get('/', function(req, res) {
  res.send("Usage: /scrape")
})

app.get('/date', function(req, res) {
    let query = req.query.query;
    if (query.indexOf("http") == -1) {
        res.end("Please provide a link");
    } else {
        request(query, function(error, response, html){
            if (!error) {
                let $ = cheerio.load(html);
                res.end($('body').text().match(/\w+\s\d{1,2}\,\s\d{4}/g)[0]);
            } else {
                res.end(error);
            }
        });
    }
});

app.listen(port)
console.log("app running on port", port);
exports = module.exports = app;
