var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	static = require('node-static'); // for serving files

var fileServer = new static.Server('.');

var port = 8080;

app.listen(port);

function handler (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response); // this will return the correct file
    });
}

// to force polling for heruko
// io.configure(function () { 
//   io.set("transports", ["xhr-polling"]); 
//   io.set("polling duration", 40); 
// });

io.set('log level', 1);

// on a 'connection' event
io.sockets.on('connection', function(socket){

  console.log("Connection " + socket.id + " accepted.");
    
  // now that we have our connected 'socket' object, we can 
  // define its event handlers
  socket.on('deviceMove', function(data){
  	socket.broadcast.emit('serverMove', data);
  });

  socket.on('deviceRotate', function(data){ 
  	socket.broadcast.emit('serverRotate', data);
  });
    
  socket.on('disconnect', function(){
    console.log("Connection " + socket.id + " terminated.");
  });

  socket.on('error', function(){
    console.log("error="+error);
  });
    
});







