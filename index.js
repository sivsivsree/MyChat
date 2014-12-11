var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userCount = 0;
var users = [];


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.get('/jq', function(req, res){
  res.sendFile(__dirname + '/jq.js');
});

io.on('connection', function(socket){


  socket.on("join", function(id){
    console.log(users.indexOf(id));
  	if(users.indexOf(id) == -1){

  		userCount = users.push(id);
	    io.emit('online', users.length  );
	    console.log(users.length  + " person joined");
	    console.log(users);

  	}

  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    
  });


  socket.on('left', function(id){
	   var u = users.indexOf(id);

	   if(u != -1){
	   	 users.splice(u, 1);
	   	 io.emit('online', users.length );
	   	 console.log(users.length +" people online");
	   }
	   
  });

});



http.listen(process.env.PORT || 5000, function(){
  console.log('Server up and running on Heroku Port || 5000');
});
