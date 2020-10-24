const MODEL_NAME = 'todo';

export default class Todos {
  constructor({ store }) {
    this.store = store;
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
    const todo = this.store.createRecord(MODEL_NAME, attrs);
    await todo.save();
    return todo;
  }

  async findAll() {
    return this.store.findAll(MODEL_NAME);
  }

  async loadAll() {
    await this.store.findAll(MODEL_NAME);
  }

  getAll() {
    return this.store.peekAll(MODEL_NAME);
  }
}
