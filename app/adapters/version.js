import Ember from 'ember';
import ajax from 'ic-ajax';
import config from '../config/environment';

export default Ember.Object.extend({
  find: function(/* name, id */) {
    return ajax(config.apiHost + '/versions');
  }
});
