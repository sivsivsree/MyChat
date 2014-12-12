var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var userCount = 0;


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/ring', function(req, res){
  res.sendFile(__dirname + '/ding.mp3');
  console.log(req);
});

app.get('/jq', function(req, res){
  res.sendFile(__dirname + '/jq.js');
});

io.on('connection', function(socket){


      userCount  = io.sockets.sockets.length;

  socket.on("join", function(id){


	   io.emit('online', io.sockets.sockets.length  );
	   userCount  = io.sockets.sockets.length;
	   console.log(io.sockets.sockets.length + " CONNECTED USERS ");

  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    
  });


  socket.on('disconnect', function(socket) {

        io.emit('online', io.sockets.sockets.length  );
        userCount  = io.sockets.sockets.length;
	   console.log(io.sockets.sockets.length + " CONNECTED USERS REMAINING");

   })

});



http.listen(process.env.PORT || 5000, function(){
  console.log('Server up and running on Heroku Port || 5000');
});
