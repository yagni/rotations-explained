(function () {
  Polymer({
    is: 'rotation-ctrl',
    properties: {
      items: {
        type: Array,
        notify: true,
      },
      matrixVisibility: 'visibility: hidden',
      anglesVisibility: 'visible: none'
    },
    ready: function() {
      this.items = [
        'Responsive Web App boilerplate',
        'Iron Elements and Paper Elements',
        'End-to-end Build Tooling (including Vulcanize)',
        'Unit testing with Web Component Tester',
        'Routing with Page.js',
        'Offline support with the Platinum Service Worker Elements'
      ];
    }
  });
})();

//import Ember from 'ember';
//
//export default Ember.Component.extend({
//  //myInit: function() {
//  //  this._super();
//  //  this.set('showMatrix', true);
//  //  this.set('editable', true);
//  //}.on('init'),
//  allowClose: true,
//  editable: true,
//  showMatrix: true,
//  classNames: ['matrix'],
//  actions: {
//    close: function() {
//      this.sendAction('close', this.get('matrix'));
//    },
//    toggleMode: function() {
//      this.set('showMatrix',!this.get('showMatrix'));
//    }
//  }
//});
