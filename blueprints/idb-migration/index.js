var System = require('es6-module-loader').System;

module.exports = {
    description: 'Create a migration for IndexedDB.',
    /*
    1. get path to migration manager
    2. load in migration manager via es6-module-loader
     */

    beforeInstall: function( options, locals ){
      console.log('migration blue print, beforeInstall');
      var Promise = System
        .import('app/migrations/migration-manager')
        .then( 
          function( migrationManager ){
            return migrationManager.default.length;
          },
          function(){
            return 0;
          })
        .then(function( versionNumber ){
          var version = versionNumber.toString(), 
              pad = 4 - version.length;

          locals.versionNumber = options.versionNumber = versionNumber;

          while(pad){
            version = '0'+version;
            pad--;
          }

          locals.fileMap.__name__ = options.migrationFileName = version+'-'+options.entity.name
        });
      return Promise;
    },
    afterInstall: function( options ){
      return this.insertIntoFile(
        'app/migrations/migration-manager.js',
        (options.versionNumber > 0 ? ',':'')+'"'+options.migrationFileName+'"',
        { before: '];' }
      );
    }
};
