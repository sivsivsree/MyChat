var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.get('/jq', function(req, res){
  res.sendFile(__dirname + '/jq.js');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(process.env.PORT || 5000, function(){
  console.log('Server up and running on Heroku Port || 5000');
});
