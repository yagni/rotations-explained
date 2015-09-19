(function () {
  Polymer({
    is: 'matrix-ctrl',
    properties: {
      values: {
        type: Array,
        value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
      }
    },

    observers: [
      '_matrixChanged(values.*)'
    ],

    _matrixChanged() {
      this.fire('matrix-changed', this.values);
    },

    ready: function() {
    }
  });
})();
