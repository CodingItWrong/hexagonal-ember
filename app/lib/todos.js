import EmberDataAPI from './api/emberData';
import EmberDataCache from './cache/emberData';

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
