import Route from 'ember-route';

export default Route.extend({
  model: function(params) {
    if (params.source[0] === 'v' && params.target[0] === 'v') {
      var source = params.source.substring(1),
          target = params.target.substring(1);

      this.transitionTo('patch', source, target);
    } else {
      this.transitionTo('notFound', 'notFound?path=' + params.source + '/' + params.target);
    }
  }
});
