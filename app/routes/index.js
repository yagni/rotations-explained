import Em from 'ember';
import math from 'npm:mathjs';
import matrix from 'rotations-explained/models/matrix';

var matrices = Em.A([
  matrix.create({
    // isFirst is a dirty hack: it's a view-related property,
    // but because Ember doesn't support @first from Handlebars,
    // we have to stick it in here :(
    //isFirst: true,
    _matrix: math.matrix([[1, 0, 0],
                          [0, 1, 0],
                          [0, 0, 1]])
  })]);

export default Em.Route.extend({
  setupController: function(controller) {
    controller.set('model', Em.Object.create({matrices: matrices}));
  }

});
