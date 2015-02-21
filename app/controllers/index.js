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
  }.observes('model', 'model.matrices.@each'),

  hasNaN: function(matrix) {
    return Ember.$.map(matrix.valueOf(), function(row){ return row; }).some(function(element){ return isNaN(element); });
  },

  actions: {
    addmatrix: function() {
      var newMatrix = matrix.create({
        _matrix: math.matrix([[1,2,3],[4,5,6],[7,8,9]])
      });
      for (var row = 0; row <= 2; row++) {
        for (var col = 0; col <= 2; col++) {
          newMatrix.addObserver('m' + row + col, this, this.modelChanged);
        }
      }
      this.get('model').matrices.pushObject(newMatrix);
      return false;
    },

    deleteMatrix: function(matrix) {
      var model = this.get('model');
      var objectToDelete = model.matrices.find(function(obj) { return obj === matrix; });
      if (objectToDelete !== undefined) { model.matrices.removeObject(objectToDelete); }
    }
  }
});
