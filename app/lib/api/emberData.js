export default class EmberDataAPI {
  constructor({ store, modelName }) {
    this.store = store;
    this.modelName = modelName;
  }

  async loadAll() {
    await this.store.findAll(this.modelName);
  }

  async create(attrs) {
    const todo = this.store.createRecord(this.modelName, attrs);
    await todo.save();
    return todo;
  }
}
