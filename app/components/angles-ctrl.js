import Ember from 'ember';
/* global THREE */

export default Ember.Component.extend({
  angles: THREE.Euler.RotationOrders,

  init: function() {
    this._super();
    this.selectedOrder = THREE.Euler.RotationOrders[0];
  },

  firstLabel: function() {
    return this.get('selectedOrder')[0];
  }.property("selectedOrder"),
  firstAngle: function() {

  },
  secondLabel: function() {
    return this.get('selectedOrder')[1];
  }.property("selectedOrder"),
  secondAngle: function() {

  },
  thirdLabel: function() {
    return this.get('selectedOrder')[2];
  }.property("selectedOrder"),
  thirdAngle: function() {

  }
});
