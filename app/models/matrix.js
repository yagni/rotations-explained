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
  m22: function(key, value) { return this._helper([2,2], value); }.property('_matrix'),

  // Convenience property (because mathjs's matrix doesn't raise changes) so observers don't
  // have to watch each individual matrix element
  // Note, due to an Ember optimization, each watcher of this must get it at least once or else
  // it will never fire that particular watcher. So if you're not binding to it, make sure to
  // manually call matrix.get('modified') at when you start observing it.
  // See "Unconsumed computed properties do not trigger observers" here:
  // http://emberjs.com/blog/2013/08/29/ember-1-0-rc8.html
  modified: function() {
    return true;
  }.property('m00','m01','m02','m10','m11','m12','m20','m21','m22')

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
