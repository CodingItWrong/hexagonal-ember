import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked newTodoName = '';
  @tracked newTodoNameError = null;

  @action
  async createTodo(evt) {
    evt.preventDefault();

    if (!this.newTodoName) {
      this.newTodoNameError = 'Name required';
      return;
    }
    this.newTodoNameError = null;

    // eslint-disable-next-line no-console
    console.log('name', this.newTodoName);

    const todo = this.store.createRecord('todo', { name: this.newTodoName });
    await todo.save();
    this.newTodoName = '';
  }
}
