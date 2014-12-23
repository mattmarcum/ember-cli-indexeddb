var Blueprint = require( 'ember-cli/lib/models/blueprint' );
var Promise    = require('ember-cli/lib/ext/promise');

module.exports = {
    description: 'Create an iniitializer for IndexedDB.',

    normalizeEntityName: function( name ) {
        return 'ember-cli-indexeddb';
    },

    // locals: function(options) {
    //   // Return custom template variables here.
    //   return {
    //     foo: options.entity.options.foo
    //   };
    // }

    afterInstall: function(options) {
        var blueprint = Blueprint.lookup( 'idb-migration', {
            paths: this.project.blueprintLookupPaths(),
        });

        return Promise.resolve().then(function(){
            return blueprint.install( options );
        });
    }

};