import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked newTodoName = '';

  @action
  async createTodo(evt) {
    evt.preventDefault();

    console.log('name', this.newTodoName);

    const todo = this.store.createRecord('todo', { name: this.newTodoName });
    await todo.save();
    this.newTodoName = '';
  }
}
