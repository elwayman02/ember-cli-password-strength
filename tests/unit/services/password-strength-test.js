import { moduleFor, test } from 'ember-qunit';
import { isPresent } from '@ember/utils';

moduleFor('service:password-strength', 'Unit | Service | password strength', {
});

test('it exists', function(assert) {
  const service = this.subject();
  assert.ok(service);
});

test('strength does its job', function (assert) {
  const service = this.subject();
  const done = assert.async();

  service.strength('foo1234').then(result => {
    assert.ok(isPresent(result), 'result is returned from shim function');
    assert.ok(isPresent(result.score), 'score is contained in result');
    done();
  });
});

test('strengthSync does its job', function (assert) {
  const service = this.subject();

  const result = service.strengthSync('foo1234');
  assert.ok(isPresent(result), 'result is returned from shim function');
  assert.ok(isPresent(result.score), 'score is contained in result');
});
