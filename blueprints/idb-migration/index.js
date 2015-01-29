var System = require('es6-module-loader').System;

module.exports = {
    description: 'Create a migration for IndexedDB.',
    /*
    1. get path to migration manager
    2. load in migration manager via es6-module-loader
     */

    install: function( options ){
      var Promise = System
        .import('app/migrations/migration-manager')
        .then( 
          function( migrationManager ){
            return migrationManager.length;
          },
          function(){
            return 0;
          })
        .then(function( versionNumber ){
          console.log('version number is :', versionNumber);
          options.version = versionNumber;
        });
      return Promise;
    }
};
