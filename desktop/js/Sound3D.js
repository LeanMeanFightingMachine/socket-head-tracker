Sound3D = function(url, position){

  this.sourceURL = url;
  
  this.secondaryRange = this.kSecondaryRange;

  this.context = new webkitAudioContext();
  this.convolver = this.context.createConvolver();
  this.panner = this.context.createPanner();
  this.source = this.context.createBufferSource();
  this.masterGainNode = this.context.createGainNode();
  this.dryGainNode = this.context.createGainNode();
  this.wetGainNode = this.context.createGainNode();

  this.masterGainNode.gain.value = 2.0;
  this.dryGainNode.gain.value = 3.0;
  this.wetGainNode.gain.value = this.kAmbientGain;

  this.source.connect(this.panner);
  this.panner.connect(this.dryGainNode);
  this.dryGainNode.connect(this.masterGainNode);

  this.panner.connect(this.convolver);
  this.convolver.connect(this.wetGainNode);
  this.wetGainNode.connect(this.masterGainNode);

  this.masterGainNode.connect(this.context.destination);

  this.source.loop = true;

  this.setPosition(position.x, position.y, position.z);

  this.loadBufferAndPlay(this.sourceURL);

}

Sound3D.prototype.setPosition = function(x, y, z){
  this.panner.setPosition(x, y, z);
}

Sound3D.prototype.setReverbImpulseResponse = function(url) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var self = this;
  request.addEventListener("load", function(){ 
    self.onLoadedImpulseBuffer(this.response);
  });
  request.send();
}

Sound3D.prototype.onLoadedImpulseBuffer = function(data){
  this.convolver.buffer = this.context.createBuffer(data, false); 
}

Sound3D.prototype.loadBufferAndPlay = function(url) {
  // Load asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var self = this;
  request.addEventListener("load", function(){ 
    self.onLoadedSourceBuffer(this.response);
  });

  request.send();
}

Sound3D.prototype.onLoadedSourceBuffer = function(data){
  this.convolver.buffer = this.context.createBuffer(data, false); 
  this.source.buffer = this.context.createBuffer(data, true);
  this.source.noteOn(0);
  console.log("onLoadedSourceBuffer");
}


Sound3D.prototype.setOrientation = function(cameraOut, cameraUp){
  this.context.listener.setOrientation(cameraOut.x, cameraOut.y, cameraOut.z, cameraUp.x, cameraUp.y, cameraUp.z);
};




