(function () {
  Polymer({
    is: 'angles-ctrl',
    properties: {
      axes: {
        type: Array,
        value: ['XYZ', 'ZYZ', 'ZYX'],
      },
      selectedAxes: {
        type: Array,
        computed: 'computeAxes(selectedIndex)',
        observer: '_axesChanged',
      },
      selectedIndex: {
        type: Number,
        value: 0,
      },
      axisValues: {
        type: Array,
        value: [0, 0, 0]
      }
    },

    observers: [
      '_anglesChanged(axisValues.*)'
    ],

    _anglesChanged() {
      this.fire('angles-changed', this.axisValues);
    },
    _axesChanged() {
      this.fire('axes-changed', this.axes[this.selectedIndex]);
    },
    // see https://www.polymer-project.org/1.0/docs/devguide/data-binding.html#array-binding
    arrayItem(change, index) {
      return change.base[index];
    },
    computeAxes() {
      return this.axes[this.selectedIndex].split("");
    },
    ready() {
    }
  });
})();
