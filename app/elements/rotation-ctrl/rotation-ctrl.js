(function () {
  Polymer({
    is: 'rotation-ctrl',
    properties: {
      showMatrix: {
        type: Boolean,
        value: true
      },
    },
    anglesChanged(e) {
      // e.detail
    },
    axesChanged(e) {
      // e.detail
    },
    matrixChanged(e) {
      // e.detail
    },
    toggleView() {
      this.showMatrix = !this.showMatrix;
    },
    ready() {
    }
  });
})();
