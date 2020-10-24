class EmberDataAPI {
  constructor({ store, modelName }) {
    this.store = store;
    this.modelName = modelName;
  }

  async loadAll() {
    await this.store.findAll(this.modelName);
  }

  async create(attrs) {
    const todo = this.store.createRecord(this.modelName, attrs);
    await todo.save();
    return todo;
  }
}

class EmberDataCache {
  constructor({ store, modelName }) {
    this.store = store;
    this.modelName = modelName;
  }

  push(/* todo */) {
    // NOOP when using EmberDataTodoAPI
  }

  pushAll(/* todos */) {
    // NOOP when using EmberDataTodoAPI
  }

  getAll() {
    return this.store.peekAll(this.modelName);
  }
}

export default class Todos {
  static forStore(store) {
    const modelName = 'todo';
    return new Todos({
      api: new EmberDataAPI({ store, modelName }),
      cache: new EmberDataCache({ store, modelName }),
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
