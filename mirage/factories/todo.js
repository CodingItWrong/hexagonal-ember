import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) {
    return `Todo ${i + 1}`;
  },
});
