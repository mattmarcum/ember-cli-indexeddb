var System = require('es6-module-loader').System;

module.exports = {
    description: 'Create a migration for IndexedDB.',
    /*
    1. get path to migration manager
    2. load in migration manager via es6-module-loader
     */

    beforeInstall: function( options, locals ){
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
          var version = versionNumber.toString(), 
              pad = 4 - version.length;

          while(pad){
            version = '0'+version;
            pad--;
          }

          locals.version = versionNumber;
          locals.fileMap.__name__ = version+'-'+options.entity.name
        });
      return Promise;
    },
    afterInstall: function( options, locals ){
      console.log('after install', locals);
    }
};
