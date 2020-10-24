export default class EmberDataCache {
  constructor({ store, modelName }) {
    this.store = store;
    this.modelName = modelName;
  }

  push(/* todo */) {
    // NOOP when using EmberDataTodoAPI
  }

  pushAll(/* todos */) {
    // NOOP when using EmberDataTodoAPI
  }

  getAll() {
    return this.store.peekAll(this.modelName);
  }
}
