import Ember from 'ember';

export default Ember.Object.extend({
  _helper: function(index, value) {
    var matrix = this.get('_matrix');
    if (value !== undefined) {
      matrix.set(index, parseFloat(value));
    }
    return matrix.get(index);
  },
  m00: function(key, value) { return this._helper([0,0], value); }.property('_matrix'),
  m01: function(key, value) { return this._helper([0,1], value); }.property('_matrix'),
  m02: function(key, value) { return this._helper([0,2], value); }.property('_matrix'),
  m10: function(key, value) { return this._helper([1,0], value); }.property('_matrix'),
  m11: function(key, value) { return this._helper([1,1], value); }.property('_matrix'),
  m12: function(key, value) { return this._helper([1,2], value); }.property('_matrix'),
  m20: function(key, value) { return this._helper([2,0], value); }.property('_matrix'),
  m21: function(key, value) { return this._helper([2,1], value); }.property('_matrix'),
  m22: function(key, value) { return this._helper([2,2], value); }.property('_matrix')

  //m01: function(key, value) {
  //  var index = [0,1];
  //  if (value !== undefined) {
  //    this.get('_matrix').set(index, value);
  //  }
  //  return this.get('_matrix').get(index);
  //}.property('_matrix'),
  //
  //m02: function(key, value) {
  //  var index = [0,2];
  //  if (value !== undefined) {
  //    this.get('_matrix').set(index, value);
  //  }
  //  return this.get('_matrix').get(index);
  //}.property('_matrix'),
  //
  //m10: function(key, value) {
  //  var index = [1,0];
  //  if (value !== undefined) {
  //    this.get('_matrix').set(index, value);
  //  }
  //  return this.get('_matrix').get(index);
  //}.property('_matrix'),
  //
  //m11: function(key, value) {
  //  var index = [1,1];
  //  if (value !== undefined) {
  //    this.get('_matrix').set(index, value);
  //  }
  //  return this.get('_matrix').get(index);
  //}.property('_matrix'),
  //
  //m12: function(key, value) {
  //  var index = [1,2];
  //  if (value !== undefined) {
  //    this.get('_matrix').set(index, value);
  //  }
  //  return this.get('_matrix').get(index);
  //}.property('_matrix'),
  //
  //m20: function(key, value) {
  //  var index = [2,0];
  //  if (value !== undefined) {
  //    this.get('_matrix').set(index, value);
  //  }
  //  return this.get('_matrix').get(index);
  //}.property('_matrix'),
  //
  //m21: function(key, value) {
  //  var index = [2,1];
  //  if (value !== undefined) {
  //    this.get('_matrix').set(index, value);
  //  }
  //  return this.get('_matrix').get(index);
  //}.property('_matrix'),
  //
  //m22: function(key, value) {
  //  var index = [2,2];
  //  if (value !== undefined) {
  //    this.get('_matrix').set(index, value);
  //  }
  //  return this.get('_matrix').get(index);
  //}.property('_matrix')
});
