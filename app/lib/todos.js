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
    const todo = this.store.createRecord('todo', attrs);
    await todo.save();
    return todo;
  }

  async findAll() {
    return this.store.findAll('todo');
  }

  async loadAll() {
    await this.store.findAll('todo');
  }

  getAll() {
    return this.store.peekAll('todo');
  }
}
