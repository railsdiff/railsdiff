import Controller from 'ember-controller';
import ControllerMessaging from '../mixins/controller-messaging';
import computed, { bool, mapBy, oneWay } from 'ember-computed';

export default Controller.extend(ControllerMessaging, {
  actions: {
    sourceDidChange(value) {
      this.set('sourceVersion', value);
    },
    targetDidChange(value) {
      this.set('targetVersion', value);
    },
    transition() {
      this.transitionToRoute('patch', this.get('sourceVersion'), this.get('targetVersion'));
    },
  },
  showForm: bool('versions.length'),
  sourceVersion: oneWay('sources.firstObject'),
  sources: computed('versions', function() {
    return this.get('versions').slice(1);
  }),
  versions: mapBy('model', 'version'),
  targetValidator: function() {
    var targets = this.get('targets');

    if (!targets.includes(this.get('targetVersion'))) {
      this.set('targetVersion', targets.get('lastObject'));
    }
  }.observes('targets'),
  targetVersion: oneWay('targets.firstObject'),
  targets: computed('versions', 'sourceVersion', function() {
    var versions = this.get('versions'),
        sourceVersion = this.get('sourceVersion'),
        sourceIndex = versions.indexOf(sourceVersion);
    if (!sourceVersion) { return []; }
    return versions.slice(0, sourceIndex);
  }),
});
