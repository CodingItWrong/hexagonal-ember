import { module, test } from 'qunit';
import Todos from 'hexagonal-ember/lib/todos';
import sinon from 'sinon';

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

  module('create', function (hooks) {
    const name = 'My Name';
    const record = { id: 1 };

    let todos;
    let api;
    let cache;
    let resolvedValue;

    hooks.beforeEach(async () => {
      api = {
        create: sinon.stub().resolves(record),
      };
      cache = {
        push: sinon.spy(),
      };
      todos = new Todos({ api, cache });

      resolvedValue = await todos.create({ name });
    });

    test('it asks the API to create the record', function (assert) {
      assert.ok(api.create.calledWith({ name }));
    });

    test('it asks the cache to store the returned record', function (assert) {
      assert.ok(cache.push.calledWith(record));
    });

    test('it resolves to the record', function (assert) {
      assert.equal(resolvedValue, record);
    });
  });

  module('loadAll', function (hooks) {
    const records = [{ id: 1 }, { id: 2 }];

    let todos;
    let api;
    let cache;
    let resolvedValue;

    hooks.beforeEach(async () => {
      api = {
        loadAll: () => Promise.resolve(records),
      };
      cache = {
        pushAll: sinon.spy(),
      };
      todos = new Todos({ api, cache });

      resolvedValue = await todos.loadAll({ name });
    });

    test('it asks the cache to store the records returned by the API', function (assert) {
      assert.ok(cache.pushAll.calledWith(records));
    });

    test('it does not resolve the records', function (assert) {
      assert.ok(!resolvedValue);
    });
  });

  module('getAll', () => {
    test('it returns the records from the cache', function (assert) {
      const records = [{ id: 1 }, { id: 2 }];
      const cache = {
        getAll: () => records,
      };
      const todos = new Todos({ cache });
      const result = todos.getAll();
      assert.equal(result, records);
    });
  });
});
