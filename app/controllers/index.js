import Ember from 'ember';
import math from 'npm:mathjs';
import matrix from 'rotations-explained/models/matrix';

export default Ember.ObjectController.extend({
  init: function() {
    this._super();
    this.set('hasError', false);
  },

  modelChanged: function() {
    var model = this.get('model');
    for (var i = 0; i < model.matrices.length; i++) {
      this.observeMatrix(model.matrices[i]);
    }
  }.observes('model'),

  matricesChanged: function() {
    var model = this.get('model');
    try {
      var result = model.matrices[0]._matrix;
      for (var i = 1; i < model.matrices.length; i++) {
        result = math.multiply(result, model.matrices[i]._matrix);
      }
      model.set('result', matrix.create({_matrix: result}));
      this.set('hasError', this.hasNaN(result));
    }
    catch (e) {
      this.set('hasError',true);
    }
  }.observes('model.matrices.@each'),

  hasNaN: function(matrix) {
    return Ember.$.map(matrix.valueOf(), function(row){ return row; }).some(function(element){ return isNaN(element); });
  },

  observeMatrix: function(matrix) {
    matrix.addObserver('modified', this, this.matricesChanged);
    // Ember hack (see models/matrix.js)
    matrix.get('modified');
  },

  actions: {
    addRotation: function() {
      var newMatrix = matrix.create({
        _matrix: math.matrix([[1,2,3],[4,5,6],[7,8,9]])
      });
      this.observeMatrix(newMatrix);
      this.get('model').matrices.pushObject(newMatrix);
      return false;
    },

    deleteRotation: function(matrix) {
      var model = this.get('model');
      var objectToDelete = model.matrices.find(function(obj) { return obj === matrix; });
      if (objectToDelete !== undefined) { model.matrices.removeObject(objectToDelete); }
    }
  }
});
