import makeInitializer from 'ember-cli-indexeddb/initializers/indexeddb';
import migrations from 'migrations/migration-manager';

export default {
    name:       'ember-cli-indexeddb',
    initialize: makeInitializer( migrations ),
    after:      "ember-data",
};