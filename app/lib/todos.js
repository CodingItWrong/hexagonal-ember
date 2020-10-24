const MODEL_NAME = 'todo';

class EmberDataTodoAPI {
  constructor({ store }) {
    this.store = store;
  }

  async loadAll() {
    await this.store.findAll(MODEL_NAME);
  }

  async create(attrs) {
    const todo = this.store.createRecord(MODEL_NAME, attrs);
    await todo.save();
    return todo;
  }
}

class EmberDataTodoCache {
  constructor({ store }) {
    this.store = store;
  }

  push(/* todo */) {
    // NOOP when using EmberDataTodoAPI
  }

  pushAll(/* todos */) {
    // NOOP when using EmberDataTodoAPI
  }

  getAll() {
    return this.store.peekAll(MODEL_NAME);
  }
}

export default class Todos {
  static forStore(store) {
    return new Todos({
      api: new EmberDataTodoAPI({ store }),
      cache: new EmberDataTodoCache({ store }),
    });
  }

  constructor({ api, cache }) {
    this.api = api;
    this.cache = cache;
  }

  validate({ name }) {
    const result = {
      valid: true,
      errors: {},
    };

    if (!name) {
      result.valid = false;
      result.errors.newTodoName = 'Name required';
    }

    return result;
  }

  async create(attrs) {
    const todo = await this.api.create(attrs);
    this.cache.push(todo);
    return todo;
  }

  async loadAll() {
    const todos = await this.api.loadAll();
    this.cache.pushAll(todos);
  }

  getAll() {
    return this.cache.getAll();
  }
}
