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

  getAll() {
    return this.store.peekAll(MODEL_NAME);
  }
}

export default class Todos {
  constructor({ store }) {
    this.store = store;
    this.api = new EmberDataTodoAPI({ store });
    this.cache = new EmberDataTodoCache({ store });
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

  create(attrs) {
    return this.api.create(attrs);
  }

  async loadAll() {
    await this.api.loadAll();
  }

  getAll() {
    return this.cache.getAll();
  }
}
