import Route from '@ember/routing/route';
import Todos from 'hexagonal-ember/lib/todos';

export default class IndexRoute extends Route {
  async model() {
    const todos = new Todos({ store: this.store });
    await todos.loadAll();
    return todos.getAll();
  }
}
