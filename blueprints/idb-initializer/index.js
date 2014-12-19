var chalk = require( 'chalk' );

module.exports = {
    description: 'Create an iniitializer for IndexedDB.',

    normalizeEntityName: function( name ) {
        return 'ember-cli-indexeddb';
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