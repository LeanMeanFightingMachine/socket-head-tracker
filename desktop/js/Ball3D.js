Ball3D = function() {
  
  var WIDTH = 400, HEIGHT = 300;

  var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;


  this.speed = {x:0, y:0, z:0};


  this.renderer = new THREE.WebGLRenderer();
  this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  this.scene = new THREE.Scene();
  this.projector = new THREE.Projector();

  this.scene.add(this.camera);
  this.camera.position.z = 300;
  this.renderer.setSize(WIDTH, HEIGHT);

  $container = $('#container-3d');
  $container.append(this.renderer.domElement);


  var sphereMaterial =
  new THREE.MeshLambertMaterial(
  {
    color: 0xCC0000
  });


  var radius = 50,
      segments = 16,
      rings = 16;


  this.sphere = new THREE.Mesh(

    new THREE.SphereGeometry(
      radius,
      segments,
      rings),

  sphereMaterial);

  // add the sphere to the scene
  this.scene.add(this.sphere);

  // create a point light
  var pointLight = new THREE.PointLight(0xFFFFFF);

  // set its position
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  // add to the scene
  this.scene.add(pointLight);
  this.render();

};

Ball3D.prototype.position = function(position){

  this.sphere.position.x = parseFloat(position.x * -1) * 100;
  this.sphere.position.y = parseFloat(position.z * -1) * 100;

  this.render();
};


Ball3D.prototype.move = function(x, y, z){

  this.speed.x += parseFloat(x * -1);
  this.speed.y += parseFloat(y * -1);
  this.speed.z += parseFloat(z * -1);

  this.sphere.translateX( this.speed.x );

  this.render();
};

Ball3D.prototype.render = function(){
  this.renderer.render(this.scene, this.camera);
};



