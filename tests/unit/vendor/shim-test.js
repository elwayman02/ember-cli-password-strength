import Ember from 'ember';
import { module } from 'qunit';
import { test } from 'ember-qunit';
import strength from 'password-strength';
import asyncStrength from 'async-password-strength';

module('Ember-CLI-Password-Strength shim');

test('it exports vendor shim', function (assert) {
  assert.equal(Ember.typeOf(strength), 'function', 'function is imported from vendor shim');

  const result = strength('foo1234');
  assert.ok(Ember.isPresent(result), 'result is returned from shim function');
  assert.ok(Ember.isPresent(result.score), 'score is contained in result');
});

test('it exports async vendor shim', function (assert) {
  const done = assert.async();
  assert.equal(Ember.typeOf(asyncStrength), 'function', 'function is imported from vendor shim');

  asyncStrength('foo1234').then(result => {
    assert.ok(Ember.isPresent(result), 'result is returned from shim function');
    assert.ok(Ember.isPresent(result.score), 'score is contained in result');
    done();
  });
});
