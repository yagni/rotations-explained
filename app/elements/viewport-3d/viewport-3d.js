/*global THREE */

(function () {
  Polymer({
    is: 'viewport-3d',
    attached() {
      // For some reason, clientWidth/Height is 0 within this handler, so the
      // TrackballControls don't get set up properly. Do a dirty hack and delay the
      //this.async(function() {
        var color = {
          primary: '#e74c3c',
          secondary: '#2ecc71',
          tertiary: '#3498db'
        };

        this.scene = new THREE.Scene();
        var xArrow = new THREE.ArrowHelper(
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(0, 0, 0),
          2.5,
          new THREE.Color(color.primary).getHex(),
          0.5,
          0.5
        );
        this.scene.add(xArrow);

        var yArrow = new THREE.ArrowHelper(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(0, 0, 0),
          2.5,
          new THREE.Color(color.secondary).getHex(),
          0.5,
          0.5
        );
        this.scene.add(yArrow);

        var zArrow = new THREE.ArrowHelper(
          new THREE.Vector3(0, 0, 1),
          new THREE.Vector3(0, 0, 0),
          2.5,
          new THREE.Color(color.tertiary).getHex(),
          0.5,
          0.5
        );
        this.scene.add(zArrow);

        this.backgroundScene = new THREE.Scene();
        var size = 10;
        var step = 1;
        var axisOffset = {x: 0, y: 0, z: 0};
        var gridHelper = new THREE.GridHelper(size, step);
        gridHelper.position.x = axisOffset.x;
        gridHelper.position.z = axisOffset.y;
        gridHelper.position.y = axisOffset.z;
        gridHelper.setColors(0x555555, 0xeeeeee);
        this.backgroundScene.add(gridHelper);

        var pixelWidth = 333, pixelHeight = 333;
        this.camera = new THREE.PerspectiveCamera(75, pixelWidth / pixelHeight, 0.1, 1000);
        this.camera.position.x = -16;
        this.camera.position.y = 7;
        this.camera.position.z = 25;
        this.camera.setLens(75);
        //this.camera.matrixAutoUpdate = false;
        this.renderer = new THREE.WebGLRenderer({canvas: this.$.viewport, alpha: false, antialias: true});
        this.renderer.autoClear = false;
        this.renderer.setSize(pixelWidth, pixelHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
        this.controls.staticMoving = true;
        //var logicUpdate = this.doLogicUpdate;
        //this.controls.addEventListener('start', function() { logicUpdate = true; });
        //this.controls.addEventListener('end', function() { logicUpdate = false; });
        this.controls.addEventListener('change', this.renderScenes.bind(this));

        this.controls.dynamicDampingFactor = 0.4;
        this.controls.noPan = true;
        this.controls.noRoll = true;

        this.renderScenes();
        this.update();
      //}, 1000);
    },

    renderScenes()
    {
      this.renderer.setClearColor(0xffffff);
      this.renderer.clear();
      this.renderer.render(this.backgroundScene, this.camera);
      this.renderer.clearDepth();
      this.renderer.render(this.scene, this.camera);
    },

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
    },
  });
})();

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
