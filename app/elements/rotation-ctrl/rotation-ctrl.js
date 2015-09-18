(function () {
  Polymer({
    is: 'rotation-ctrl',
    properties: {
      showMatrix: {
        type: Boolean,
        value: true
      },
    },
    toggleView: function() {
      this.showMatrix = !this.showMatrix;
    },
    ready: function() {
    }
  });
})();
