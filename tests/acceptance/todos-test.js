import { module, test } from 'qunit';
import { visit, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | todos', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('creating a todo', async function (assert) {
    await visit('/');

    await fillIn('[data-test-todo-name-field]', 'My Todo');
    await click('[data-test-create-todo]');

    assert.dom('[data-test-todo-list-item]').hasText('My Todo');
  });
});
