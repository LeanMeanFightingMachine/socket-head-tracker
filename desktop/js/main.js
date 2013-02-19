
var App = function (){

	this.$xOut = $("#x");
	this.$yOut = $("#y");
	this.$zOut = $("#z");
	this.$message = $("#message");
	this.$status = $("#status");

    this.socket = null;
    this.firstconnect = true;

	this.soundScape3D = new SoundScape3D();

	this.connect();
	this.animate();
};

App.prototype.connect = function () {
	if(this.firstconnect) {
		// this.socket = io.connect("http://leanmean.nodejitsu.jit.su/");
		this.socket = io.connect("http://localhost:8080");

		var self = this;

		this.socket.on('message', function(data){ self.message(data); });
		this.socket.on('serverRotate', function(data){ self.serverRotate(data); });
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

App.prototype.message = function(data) {
	console.log("in message: data="+data);
	this.$message.text(data);
};

App.prototype.statusUpdate = function(txt){
  this.$status.text(txt);
};

App.prototype.esc = function(msg){
  return msg.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

App.prototype.serverRotate = function(rotation){
	this.$xOut.text("rot X: " + rotation.x);
	this.$yOut.text("rot Y: " + rotation.y);
	this.$zOut.text("rot Z: " + rotation.z);

	this.soundScape3D.rotate(rotation);

};

App.prototype.animate = function() {
	requestAnimFrame(this.animate.bind(this));
};

$(document).ready(function () {
  var app = new App();
;});