import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import THREE from 'three';
import TrackballControls from '../../vendor/TrackballControls';
import ColladaLoader from '../../vendor/ColladaLoader';

export default class extends Component {

  componentDidMount() {
    this.loader = new ColladaLoader();
    this.loader.options.centerGeometry = true;
    this.loader.options.upAxis = 'Z';
    this.loader.load( 'human.dae', collada => this.init(collada.scene));
  }

  init(model) {
    // For some reason, clientWidth/Height is 0 within this handler, so the
    // TrackballControls don't get set up properly. Do a dirty hack and delay the
    //this.async(function() {

    this.scene = new THREE.Scene();
    this.rotatableObjects = new THREE.Object3D();
    this.rotatableObjects.add(...this.createAxisArrows());
    this.scene.add(...this.drawArc(0x0000ff, .25 * Math.PI));
    this.scene.add(...this.drawArc(0x00ff00, .25 * Math.PI, .5 * Math.PI, .25 * Math.PI, 0));
    //objects = objects.concat(drawArc(scene, 0x0000ff, .25 * Math.PI, .25 * Math.PI));

    this.scene.add(...this.addAxisLines(1, 2, 3));

    this.scene.add(this.rotatableObjects);

    model.up = new THREE.Vector3(0,0,1);
    this.rotatableObjects.add(model);

    this.backgroundScene = new THREE.Scene();
    var size = 10;
    var step = 1;
    var gridHelper = new THREE.GridHelper(size, step);
    gridHelper.setColors(0x555555, 0xeeeeee);
    gridHelper.rotation.x = 1.57;
    this.backgroundScene.add(gridHelper);

    var pixelWidth = 333, pixelHeight = 333;
    this.camera = new THREE.PerspectiveCamera(75, pixelWidth / pixelHeight, 0.1, 1000);
    this.camera.position.x = 20;
    this.camera.position.y = -12;
    this.camera.position.z = 9;
    this.camera.up = new THREE.Vector3(0, 0, 1);
    this.camera.setLens(75);
    //this.camera.matrixAutoUpdate = false;
    this.renderer = new THREE.WebGLRenderer({canvas: ReactDOM.findDOMNode(this.refs.viewport), alpha: false, antialias: true});
    this.renderer.autoClear = false;
    this.renderer.setSize(pixelWidth, pixelHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
    this.controls.staticMoving = true;
    this.controls.noPan = true;
    //var logicUpdate = this.doLogicUpdate;
    //this.controls.addEventListener('start', function() { logicUpdate = true; });
    //this.controls.addEventListener('end', function() { logicUpdate = false; });
    this.controls.addEventListener('change', this.renderScenes.bind(this));

    this.controls.dynamicDampingFactor = 0.4;
    //this.controls.noPan = true;
    //this.controls.noRoll = true;

    this.renderScenes();
    this.built = true;
    this.update();
  }

  setRotations() {
    this.rotatableObjects.setRotationFromMatrix(this.props.matrix);
    //this.rotatableObjects.rotation.z += .25 * Math.PI;
    //this.rotatableObjects.rotation.y -= .25 * Math.PI;
  }

  renderScenes() {
    this.renderer.setClearColor(0xffffff);
    this.renderer.clear();
    this.renderer.render(this.backgroundScene, this.camera);
    this.renderer.clearDepth();
    this.renderer.render(this.scene, this.camera);
  }

  update() {
    requestAnimationFrame(this.update.bind(this));

    //this.rotY += Math.PI / 180;

    //var cameraPosOffset = new THREE.Matrix4();
    //cameraPosOffset.setPosition(new THREE.Vector3(0, 0, 25));

    //var cameraRot = new THREE.Matrix4();
    //cameraRot.makeRotationFromEuler(new THREE.Euler(0, this.rotY, 0, 'XYZ'));
    //
    //var cameraMat = new THREE.Matrix4();
    //cameraMat.multiplyMatrices(cameraRot, cameraPosOffset);
    //
    //var cameraPosCenter = new THREE.Matrix4();
    //cameraMat = cameraPosCenter.multiplyMatrices(cameraPosCenter, cameraMat);

    //this.camera.matrix = cameraMat;
    //this.camera.updateMatrixWorld(true);

    //this.renderer.render(this.scene, this.camera);

    //if (!this.doLogicUpdate) {
    //  return;
    //}

    this.controls.update();

    //this.camera.updateMatrixWorld(true);

    //var origPoints = float32ArrayToVec3Array(positions)
    //
    //// Draw points along just the X dimension.
    //if (!didDrawOriginalPoints) {
    //  // Simple hack to cut down on redraws. This points don't change.
    //  didDrawOriginalPoints = true
    //  ctx.fillStyle = color.senary
    //  ctx.globalAlpha = 0.05
    //  origPoints.forEach(function(d) {
    //    ctx.beginPath()
    //    ctx.arc(xScale(d.x - axisOffset.x), oh(0), 4, 0, tau)
    //    ctx.fill()
    //    ctx.beginPath()
    //    ctx.arc(xScale(d.y - axisOffset.y), oh(1), 4, 0, tau)
    //    ctx.fill()
    //    ctx.beginPath()
    //    ctx.arc(xScale(d.z - axisOffset.z), oh(2), 4, 0, tau)
    //    ctx.fill()
    //  })
    //}
    //
    //// Because of our hack above, only clear the bottom portion of the canvas
    //// leaving the original points untouched.
    //ctx.clearRect(0, pH / 2, pW, pH)
    //
    //// Modifies `origPoints`.
    //var projPoints = origPoints.map(toScreenXY)
    //projPoints.forEach(function(d) {
    //  ctx.beginPath()
    //  ctx.arc(d[0], oh(4), 4, 0, tau)
    //  ctx.fill()
    //  ctx.beginPath()
    //  ctx.arc(d[1], oh(5), 4, 0, tau)
    //  ctx.fill()
    //  ctx.beginPath()
    //  ctx.arc(d[2], oh(6), 4, 0, tau)
    //  ctx.fill()
    //})
  }

  createAxisArrows() {
    const color = {
      primary: '#e74c3c',
      secondary: '#2ecc71',
      tertiary: '#3498db'
    };

    const xArrow = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 0, 0),
      2.5,
      new THREE.Color(color.primary).getHex(),
      0.5,
      0.5
    );

    const yArrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 0),
      2.5,
      new THREE.Color(color.secondary).getHex(),
      0.5,
      0.5
    );

    const zArrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, 0),
      2.5,
      new THREE.Color(color.tertiary).getHex(),
      0.5,
      0.5
    );
    return [xArrow, yArrow, zArrow];
  }

  // angle is in radians
  drawArc(color, angle, xRotation = 0, yRotation = 0, zRotation = 0) {
    const arcObjects = [];
    const radius = 2;
    const curve = new THREE.EllipseCurve(
      0,  0,              // ax, aY
      radius, radius,           // xRadius, yRadius
      0,  angle,          // aStartAngle, aEndAngle
      false,              // aClockwise
      0                   // aRotation
    );

    const points = curve.getPoints(10);
    points.push(new THREE.Vector2(0, 0));
    const shape = new THREE.Shape();
    shape.fromPoints(points);
    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial({color, side: THREE.DoubleSide, transparent: true, opacity: .5});

    // Create the final Object3d to add to the scene
    var mesh = new THREE.Mesh( geometry, material );

    arcObjects.push(mesh);

    const angleCurve = new THREE.EllipseCurve(
      0,  0,              // ax, aY
      radius * .75, radius * .75,               // xRadius, yRadius
      0,  angle,  // aStartAngle, aEndAngle
      false,              // aClockwise
      0                   // aRotation
    );

    const anglePoints = angleCurve.getSpacedPoints( 10 );
    const anglePath = new THREE.Path();

    const angleLine = new THREE.Line( anglePath.createGeometry( anglePoints ), new THREE.LineBasicMaterial( { color : 0x330000 } ) );
    arcObjects.push(angleLine);

    for (const obj of arcObjects) {
      obj.rotation.order = 'XYZ';
      obj.rotation.x = xRotation;
      obj.rotation.y = yRotation;
      obj.rotation.z = zRotation;
    }

    return arcObjects;
  }

  addAxisLines(x, y, z) {
    const lineObjects = [];
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3( 0, 0, 0 ),
      new THREE.Vector3( x, 0, 0 ),
      new THREE.Vector3( x, y, 0 ),
      new THREE.Vector3( x, y, z )
    );
    geometry.computeLineDistances();

    var material = new THREE.LineDashedMaterial( { color: 0x000000, dashSize: .1, gapSize: .05 } );

    var line = new THREE.Line( geometry, material );
    lineObjects.push(line);

    var pointGeometry = new THREE.BoxGeometry( .05, .05, .05 );
    pointGeometry.translate(x, y, z);
    var pointMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var cube = new THREE.Mesh( pointGeometry, pointMaterial );
    lineObjects.push(cube);
    return lineObjects;
  }

  render() {
    if (this.built) {
      this.setRotations();
      this.renderScenes();
    }
    return (
      <canvas ref="viewport" styles="width: 333px; height: 333px;"></canvas>
    );
  }
};

//
//controls.addEventListener('start', function() {
//  shouldUpdate = true
//  if (timer) clearTimeout(timer), timer = null
//})
//
//controls.addEventListener('end', function() {
//  if (!timer) timer = setTimeout(function(){ shouldUpdate = false }, 1000)
//  // console.log('var quaternion = ' + camera2.quaternion.toArray())
//  // console.log('var position = ' + camera2.position.toArray())
//  // console.log('var up = ' + camera2.up.toArray())
//})
//
//var timer = setTimeout(function(){ shouldUpdate = false }, 1000)
//
//update();
//},
//
//rotate: function() {
//}
