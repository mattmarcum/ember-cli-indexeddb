import makeInitializer from 'ember-cli-indexeddb/initializers/indexeddb';
import migration0001 from '../migrations/0001-initial';

var migrationArray = [
	migration0001,
];

export default {
    name: 'ember-cli-indexeddb',
    initialize: makeInitializer( migrationArray ),
    after:      "ember-data",
};