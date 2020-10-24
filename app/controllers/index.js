import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Todos from 'hexagonal-ember/lib/todos';

export default class IndexController extends Controller {
  @tracked newTodoName = '';
  @tracked errors = {};

  @action
  async createTodo(evt) {
    evt.preventDefault();

    const attrs = { name: this.newTodoName };

    const todos = Todos.forStore(this.store);
    const validation = todos.validate(attrs);

    if (!validation.valid) {
      this.errors = validation.errors;
      return;
    }
    this.errors = {};

    await todos.create(attrs);
    this.newTodoName = '';
  }
}
