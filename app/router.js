import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('patch', {path: '/:source/:target'});
  this.resource('diff', {path: '/diff/:source/:target'});
  this.resource('html', {path: '/html/:path'});
  this.route('about');
  this.route('notFound', {path: '/*path'});
});

export default Router;
