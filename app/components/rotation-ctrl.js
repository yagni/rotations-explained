import Ember from 'ember';

export default Ember.Component.extend({
  //myInit: function() {
  //  this._super();
  //  this.set('showMatrix', true);
  //  this.set('editable', true);
  //}.on('init'),
  allowClose: true,
  editable: true,
  showMatrix: true,
  classNames: ['matrix'],
  actions: {
    close: function() {
      this.sendAction('close', this.get('matrix'));
    },
    toggleMode: function() {
      this.set('showMatrix',!this.get('showMatrix'));
    }
  }
});
