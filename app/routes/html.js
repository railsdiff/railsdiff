import Ember from 'ember';

var pattern = /v(.*)-v(.*).html/;

export default Ember.Route.extend({
  model: function(params) {
    var match = params.path.match(pattern);
    if (match) {
      this.transitionTo('patch', match[1], match[2]);
    } else {
      this.transitionTo('notFound', 'notFound?path=' + params.path);
    }
  }
});
