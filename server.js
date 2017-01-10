var express = require('express');
var port = process.env.PORT;
var app = express();
var uuid = require('node-uuid');
var urls = [];
app.get('/',(req, res) => {
  res.send('use /:url to set a new one, /goto/:tinyurl to get the original one');
});

app.get('/:url', (req, res) => {
  var url = req.params.url;
  if(url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
    var n = {short: uuid.v1() + urls.length, original: url};
    urls.push(n);
    res.json(n);
  }else{
    res.json({error: 'The url is invalid', url: url});
  }
});
app.get('/goto/:tinyurl', function(req, res) {
    urls.some((v) => {
      if(v.short === req.params.tinyurl){
        res.redirect('http://' + v.original);
        return true;
      }return false;
    });
});
app.listen(port, console.log(`Listening on port ${port}`));