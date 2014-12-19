import { initialize } from 'ember-cli-indexeddb/initializers/indexeddb'

export default {
    name: 'ember-cli-indexeddb',
    initialize: initialize,
    after:      "ember-data",
};