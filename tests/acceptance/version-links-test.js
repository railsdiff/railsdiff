import Pretender from 'pretender';
import moduleForAcceptance from 'rails-diff/tests/helpers/module-for-acceptance';
import patch from '../fixtures/patch';
import { test } from 'qunit';

moduleForAcceptance('Acceptance | version links', {
  afterEach() {
    this.server.shutdown();
  },
  beforeEach() {
    this.server = new Pretender();
    this.server.get('http://api.railsdiff.org/v3.1.1/v3.2.6', function() {
      return [200, {}, patch];
    });
  },
});

const links = {
  source: '.links .source',
  target: '.links .target'
};

function hrefFor(selector) {
  return find(selector).attr('href');
}

function textFor(selector) {
  return find(selector + ':first').text();
}

test('links are rendered', function(assert) {
  visit('/3.1.1/3.2.6');

  andThen(function() {
    assert.ok(find(links.source));
    assert.ok(find(links.target));
  });
});

test('links match versions', function(assert) {
  visit('/3.1.1/3.2.6');

  andThen(function() {
    assert.equal(textFor(links.source), '3.1.1');
    assert.equal(textFor(links.target), '3.2.6');
  });
});

test('links navigate to generated files', function(assert) {
  visit('/3.1.1/3.2.6');

  andThen(function() {
    assert.equal(hrefFor(links.source), 'https://github.com/railsdiff/api/raw/master/generated/v3.1.1/Gemfile');
    assert.equal(hrefFor(links.target), 'https://github.com/railsdiff/api/raw/master/generated/v3.2.6/Gemfile');
  });
});
