App = function(){

	this.$xOut = $("#x");
	this.$yOut = $("#y");
	this.$zOut = $("#z");
	this.$status = $("#status");

    this.socket = null;
    this.firstconnect = true;

	this.rotation = {x:0, y:0, z:0};

	this.connect();
	this.animate();

	var self = this;
	window.addEventListener("deviceorientation", function(){ 
		self.onDeviceOrientation(event);
	});

	setInterval(function(){
		self.sendToSocket();
	}, 100);

};

App.prototype.onMouseMove = function(event) {

    this.$xOut.text("x: " + event.pageX);
    this.$yOut.text("y: " + event.pageY);

};

App.prototype.onDeviceOrientation = function(event) {

    this.rotation.z = event.gamma / 180 * Math.PI;
    this.rotation.x = event.beta / 180 * Math.PI;
    this.rotation.y = event.alpha / 180 * Math.PI;

    this.$xOut.text("x rot: " + this.rotation.x);
    this.$yOut.text("y rot: " + this.rotation.y);
   	this.$zOut.text("z rot: " + this.rotation.z);

};

App.prototype.connect = function () {
	if(this.firstconnect) {

		//this is where you're runing the node app, probably your desktop's IP on the local network
		this.socket = io.connect("http://192.168.43.148:8080");

		var self = this;

		this.socket.on('connect', function(){ self.statusUpdate("Connected to Server"); });
		this.socket.on('disconnect', function(){ self.statusUpdate("Disconnected from Server"); });
		this.socket.on('reconnect', function(){ self.statusUpdate("Reconnected to Server"); });
		this.socket.on('reconnecting', function(){ self.statusUpdate("Reconnecting in a few seconds"); });
		this.socket.on('reconnect_failed', function(){ self.message("Reconnect Failed"); });

		this.firstconnect = false;
	} else {
		this.socket.socket.reconnect();
	}
};

App.prototype.disconnect = function () {
  this.socket.disconnect();
};

App.prototype.statusUpdate = function(txt){
  this.$status.text(txt);
};

App.prototype.esc = function(msg){
  return msg.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

App.prototype.sendToSocket = function() {
	this.socket.emit('deviceRotate', this.rotation);
};

App.prototype.reset = function(){
    var date = new Date();
    this.lastTime = date.getTime() / 1000;

    this.acceleration = {x:0, y:0, z:0};
    this.velocity = {x:0, y:0, z:0};
    this.distance = {x:0, y:0, z:0};
    this.position = {x:0, y:0, z:0};
    this.rotation = {x:0, y:0, z:0};
}

App.prototype.animate = function() {
	this.frameID = requestAnimationFrame(this.animate.bind(this));
};

$(document).ready(function () {
  var app = new App();
;});





