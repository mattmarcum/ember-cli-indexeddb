import Ember from 'ember';

export default function makeInitializer( migrationsArray ){

    return function( container, application ) {

        var getMigrations = function( migrations ){
                migrations = migrations.sort( function( a, b ){
                        var aVer = a.get( 'version' ),
                            bVer = b.get( 'version' );

                        return  aVer < bVer ? -1 :
                                aVer > bVer ? 1 :
                                0;
                    });

                Ember.assert( 'IndexedDB Initializer: You have not defined any'+
                    'migrations.  Run `ember generate idb-migration '+
                    '--name=<migration-name>` to generate one.',
                    migrations.length );

                return migrations;
            },

            calculateIDBVersion = function( migrations ){
                return migrations[ migrations.length -1 ].version;
            },

            makeMigrationRunner = function( migrations, appDBVersion ){
                return function( event ){
                    var IDBVersion           = event.oldVersion,
                        migrationsToRun      = migrations.filter(
                            function( migration ){
                                //filter just the migrations that are needed
                                return ( migration.version > IDBVersion &&
                                    migration.version <= appDBVersion );
                            }),
                        db = event.target.result;

                    Ember.assert( 'IndexedDB Initializer: an `upgradeneeded`'+
                        'even was triggered, but we could not find any '+
                        'migrations to run.  IndexDB Version: '+IDBVersion+
                        ' App Version:'+appDBVersion, migrationsToRun.length);


                    db.onerror = function(event) {
                        Ember.Error( 'IndexedDB Initializer: An error occurred'+
                        ' while trying to upgrade IndexedDB:', event );
                    };

                    console.log( 'ecidb:rungMigrations - event:', event );
                    console.log( 'migrations:', migrations );

                    //open up db
                    //open up transaction
                    migrationsToRun.forEach( function( migration ){
                        migration.migrate( db );
                    });
                };
            },

            migrations          = getMigrations( migrationsArray ),
            idbName             = application.get( 'indexedDBName' ),
            appDBVersion        = calculateIDBVersion( migrations ),
            runMigrations       = makeMigrationRunner(  migrationsArray,
                                                        appDBVersion ),
            request;

        Ember.assert( 'IndexedDB Initializer: IndexedDB was not detected',
            window.indexedDB );

        Ember.assert( 'IndexedDB Initializer: `indexedDBName` was not set in'+
            'your config/environtment.json:ENV.APP.indexedDBName', idbName );

        Ember.assert( 'IndexedDB Initializer: There was a problem calculating'+
            'the current version number.', appDBVersion );

        request = window.indexedDB.open( idbName, appDBVersion );

        request.onupgradeneeded = runMigrations;
    };
}
