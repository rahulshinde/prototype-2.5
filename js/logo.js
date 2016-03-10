//general scene variables

console.log((Math.random()*20).toFixed(0));

var scene,
	camera,
	light1,
	light2,
	renderer,
	cube;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

//variables for movable light

var mouseX = 0, mouseY = 0;

var pts = [];
var closedSpline;

var container = document.getElementById( 'prototype-3' );

init();
animate();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.x = 15;
	camera.position.z = 125;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	//adding lights, sphere is just to check light position.
	var sphere = new THREE.SphereGeometry( 0.4, 16, 8 );

	light1 = new THREE.PointLight( 0x22d7c8, 1, 4500 );
	// light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x2defff } ) ) );
	light1.position.set( 0, 0, 50 );
	scene.add( light1 );

	light2 = new THREE.PointLight( 0xffffff, 1, 4500 );
	// light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xf8ffa8 } ) ) );
	light2.position.set( 10, 30, 10 );
	scene.add( light2 );

	scene.add( new THREE.AmbientLight( 0xff0000 ) );

	// adding main shapes

	group = new THREE.Group();

	//shape1

	var shape1 = new THREE.Shape();

	shape1.moveTo( 8, 7 );
	shape1.lineTo( 0, 0 );
	shape1.lineTo( -2, 3 );
	shape1.lineTo( 5, 9 );
	shape1.lineTo( -1, 15 );
	shape1.lineTo( -3, 15 );
	shape1.lineTo( -3, 19 );
	shape1.lineTo( 18, 19 );
	shape1.lineTo( 18, 15 );
	shape1.lineTo( 16, 15 );
	shape1.lineTo( 10, 9 );
	shape1.lineTo( 10, 9 );
	shape1.lineTo( 18, 3 );
	shape1.lineTo( 16, 0 );
	

	var hole = new THREE.Path();
	hole.moveTo( 8, 12);
	hole.moveTo( 11, 15);
	hole.moveTo( 4, 15);
	

	shape1.holes.push(hole);

	var extrudeSetting1 = { amount: 5, bevelEnabled: false, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry1 = new THREE.ExtrudeGeometry( shape1, extrudeSetting1 );

	var mesh1 = new THREE.Mesh( geometry1, new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: true } ) );

	mesh1.position.set( 3, 7, 3);
	mesh1.geometry.applyMatrix(new THREE.Matrix4().makeTranslation( -3, -7, -3 ) );


	mesh1.scale.set(3,3,3);

	mesh1.position.x = -10;
	mesh1.position.y = 10;
	mesh1.position.z = 0;

	group.add( mesh1 );

	scene.add( group );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = (window.innerWidth) / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( (window.innerWidth), window.innerHeight );

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX );
	mouseY = ( event.clientY - windowHalfY );

}

function animate() {

	requestAnimationFrame( animate );
	render();

}	

function render() {
	light1.position.set ( (mouseX - light1.position.x) * 0.075, - (mouseY - light1.position.y) * 0.075, 50);

	// group.rotation.x += 0.002;
	group.rotation.y += .01;
	// group.rotation.z += .002;

	renderer.render(scene, camera);
};
