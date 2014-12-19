import makeInitializer from 'ember-cli-indexeddb/initializers/indexeddb';

var migrationArray = [
];

export default {
    name:       'ember-cli-indexeddb',
    initialize: makeInitializer( migrationArray ),
    after:      "ember-data",
};