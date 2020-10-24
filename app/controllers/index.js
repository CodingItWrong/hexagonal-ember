import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

class Todos {
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
}

export default class IndexController extends Controller {
  @tracked newTodoName = '';
  @tracked errors = {};

  @action
  async createTodo(evt) {
    evt.preventDefault();

    const attrs = { name: this.newTodoName };

    const todos = new Todos({ store: this.store });
    const validation = todos.validate(attrs);

    if (!validation.valid) {
      this.errors = validation.errors;
      return;
    }
    this.errors = {};

    // eslint-disable-next-line no-console
    console.log('name', this.newTodoName);

    await todos.create(attrs);
    this.newTodoName = '';
  }
}
