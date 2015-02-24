import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super();
    this.showMatrix = true;
  },
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
