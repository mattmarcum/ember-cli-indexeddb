var Blueprint   = require( 'ember-cli/lib/models/blueprint' );
var Promise     = require('ember-cli/lib/ext/promise');
var fs          = require('fs-extra');
var path        = require('path');
var EOL         = require('os').EOL;
var SilentError = require('ember-cli/lib/errors/silent');


module.exports = {
    description: 'Set up Ember-Cli-IndexedDB.',

    availableOptions: [
        { name: 'databaseName' },
        { name: 'adapter', default: 'application' },
        { name: 'migration', default: 'initial-migration' }
    ],

    normalizeEntityName: function() {
        // this prevents an error when the entityName is
        // not specified (since that doesn't actually matter
        // to us
    },

    install: function( options ){
        this.project = options.project;

        return Promise.resolve().then(function(){
            var blueprint = Blueprint.lookup( 'idb-initializer', {
                paths: options.project.blueprintLookupPaths(),
            });

            return Promise.resolve().then(function(){
                return blueprint.install( options );
            });
        }).then(function(){
            var blueprint = Blueprint.lookup( 'idb-migration', {
                paths: options.project.blueprintLookupPaths(),
            });

            options.entity.name = options.migration || 'initial-migration';

            return Promise.resolve().then(function(){
                return blueprint.install( options );
            });
        }).then(function(){
            var blueprint = Blueprint.lookup( 'idb-adapter', {
                paths: options.project.blueprintLookupPaths(),
            });

            options.entity.name = options.migration || 'application';

            return Promise.resolve().then(function(){
                return blueprint.install( options );
            });
        }).then(function(){
            if( options.databaseName ){
                return this.insertIntoFile(
                    'config/environment.js',
                    "ENV.APP.indexedDBName = '"+ options.databaseName +"';"+EOL,
                    { before: 'return ENV;' }
                );
            }
        }.bind(this));
    }
};