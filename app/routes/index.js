import Route from '@ember/routing/route';
import Todos from 'hexagonal-ember/lib/todos';

export default class IndexRoute extends Route {
  model() {
    const todos = new Todos({ store: this.store });
    return todos.findAll();
  }
}
