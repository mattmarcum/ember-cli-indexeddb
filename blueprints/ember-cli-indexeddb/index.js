var Blueprint = require( 'ember-cli/lib/models/blueprint' );
var Promise    = require('ember-cli/lib/ext/promise');

module.exports = {
    description: 'Set up Ember-Cli-IndexedDB.',

    availableOptions: [
        { name: 'adapter', default: 'application' }
    ],

    normalizeEntityName: function() {
        // this prevents an error when the entityName is
        // not specified (since that doesn't actually matter
        // to us
    },

    install: function( options ){
        //TODO parse options

        return Promise.resolve().then(function(){
            var blueprint = Blueprint.lookup( 'idb-initializer', {
                paths: this.project.blueprintLookupPaths(),
            });

            return Promise.resolve().then(function(){
                return blueprint.install( options );
            });
        }).then(function(){
            var blueprint = Blueprint.lookup( 'idb-migration', {
                paths: this.project.blueprintLookupPaths(),
            });

            return Promise.resolve().then(function(){
                return blueprint.install( options );
            });
        }).then(function(){
            var blueprint = Blueprint.lookup( 'idb-adapter', {
                paths: this.project.blueprintLookupPaths(),
            });

            return Promise.resolve().then(function(){
                return blueprint.install( options );
            });
        });
    }

    // locals: function(options) {
    //   // Return custom template variables here.
    //   return {
    //     foo: options.entity.options.foo
    //   };
    // }

    // afterInstall: function(options) {
    //   // Perform extra work here.
    // }
};