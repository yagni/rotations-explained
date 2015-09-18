(function () {
  Polymer({
    is: 'angles-ctrl',
    properties: {
      axes: {
        type: Array,
        value: ['XYZ', 'ZYZ', 'ZYX'],
      },
      selectedAxes: {
        type: Object,
      },
      axisValues: {
        type: Array,
        value: [0, 0, 0]
      }
    },
    ready() {
      this.selectedAxes = this.axes[0]; // TODO: Why doesn't this trigger?
    }
  });
})();
