import { module, test } from 'qunit';
import Todos from 'hexagonal-ember/lib/todos';

module('Unit | todos', function () {
  module('validate', () => {
    test('returns true when name present', function (assert) {
      const todos = new Todos({});
      const validation = todos.validate({ name: 'hello' });

      assert.ok(validation.valid);
      assert.ok(!validation.errors.newTodoName);
    });

    test('returns an error when name absent', function (assert) {
      const todos = new Todos({});
      const validation = todos.validate({ name: '' });

      assert.ok(!validation.valid);
      assert.equal(validation.errors.newTodoName, 'Name required');
    });
  });
});
