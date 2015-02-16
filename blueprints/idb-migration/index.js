var System = require('es6-module-loader').System;

module.exports = {
    description: 'Create a migration for IndexedDB.',
    /*
    1. get path to migration manager
    2. load in migration manager via es6-module-loader
     */

    beforeInstall: function( options, locals ){
      console.log('before install', locals);
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
    // move into beforeInstall - modify locals to have this file map
    // fileMapTokens: function( options ){
    //   console.log('filemaptokes');
    //   return {
    //     __name__: function(options){
    //       var version = options.version.toString(),
    //           pad = 4 - version.length;

    //       while(pad){
    //         version = '0'+version;
    //         pad--;
    //       }
    //       return version+'-'+options.entity.name;
    //     }
    //   }
    // }
};
