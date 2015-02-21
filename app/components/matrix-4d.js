import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['matrix'],
  actions: {
    close: function() {
      this.sendAction('close', this.get('matrix'));
    }
  }
});
