SoundScape3D = function() {
	
	this.WIDTH = 1600;
	this.HEIGHT = 1000;
	this.DEPTH = 1000;
	this.FLOOR_Y = -20;
	this.SOUND_MIN_Y = -5;
	this.SOUND_MAX_Y = 5;
	this.SOUND_SCALE = 1;

	this.soundObjects = [];
	this.soundPosition = {x:0, y:0, z:50}

	this.frameNum = 0;

	var VIEW_ANGLE = 45,
		ASPECT = this.WIDTH / this.HEIGHT,
		NEAR = 0.1,
		FAR = 10000;


	this.renderer = new THREE.WebGLRenderer();
	this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	this.scene = new THREE.Scene();
	this.projector = new THREE.Projector();

	this.cameraOut = new THREE.Vector3( 0, 0, -1);
	this.cameraUp = new THREE.Vector3( 0, 1, 0);

	this.scene.add(this.camera);
	this.renderer.setSize(this.WIDTH, this.HEIGHT);

	$container = $('#container-3d');
	$container.append(this.renderer.domElement);


	// create a point light
	var pointLight = new THREE.PointLight(0xFFFFFF);

	// set its position
	pointLight.position.x = 20;
	pointLight.position.y = 50;
	pointLight.position.z = 0;

	// add to the scene
	this.scene.add(pointLight);

	planeMaterial = new THREE.MeshLambertMaterial(
	{
	  color: 0x808080,
	  side: THREE.DoubleSide,
	  opacity: 1
	});

	var plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1, 1), planeMaterial);

	plane.position.z = -50;
	plane.position.y = -20;
	plane.position.x = 0;

	plane.rotation.x = Math.PI / 2;
    this.scene.add(plane);
	this.createObject("http://f890e97417f89dd1e071-3f9b1f7147b0dab3fc49dfd00740b116.r2.cf1.rackcdn.com/audio3d/zoetrope.mp3", this.soundPosition.x, this.soundPosition.y, this.soundPosition.z);
	this.render();

	this.animate();

};

SoundScape3D.prototype.createObject = function(url, x, y, z){
	var soundObject = {};

	sphereMaterial = new THREE.MeshLambertMaterial(
	{
	  color: 0x44DD44
	});

	soundObject.object3D = new THREE.Mesh(
	  new THREE.SphereGeometry(5, 5,10), sphereMaterial);


	soundObject.object3D.position.x = x * this.SOUND_SCALE;
	soundObject.object3D.position.y = y * this.SOUND_SCALE;
	soundObject.object3D.position.z = z * -this.SOUND_SCALE;

	this.scene.add(soundObject.object3D);

	soundObject.sound = new Sound3D(url, {x: x, y: y, z: z});

	this.soundObjects.push(soundObject)

	return soundObject;

};

SoundScape3D.prototype.rotate = function(rotation){

	this.camera.rotation.x = parseFloat(rotation.x);
	this.camera.rotation.y = parseFloat(rotation.y);
	this.camera.rotation.z = parseFloat(rotation.z);

	this.cameraOut = new THREE.Vector3( 0, 0, -1);
	this.cameraUp = new THREE.Vector3( 0, -1, 0);

	this.camera.matrixWorld.multiplyVector3( this.cameraOut );
	this.camera.matrixWorld.multiplyVector3( this.cameraUp );

	var i = this.soundObjects.length;
	while(i--){
		this.soundObjects[i].sound.setOrientation( this.cameraOut, this.cameraUp );
	}

	this.render();
};

SoundScape3D.prototype.render = function(){
	this.renderer.render(this.scene, this.camera);
};

SoundScape3D.prototype.animate = function() {
	this.frameNum ++;
	this.soundPosition.y = Math.sin(this.frameNum / 100) * (this.SOUND_MAX_Y - this.SOUND_MIN_Y) + this.SOUND_MIN_Y;
	var i = this.soundObjects.length;
	while(i--){
		this.soundObjects[i].object3D.position.y = this.soundPosition.y;
		this.soundObjects[i].sound.setPosition(this.soundPosition.x, this.soundPosition.y, this.soundPosition.z);
	};
	requestAnimFrame(this.animate.bind(this));
	this.render();
};



