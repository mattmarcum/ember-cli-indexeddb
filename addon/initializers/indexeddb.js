import Ember from 'ember';

export default function makeInitializer( migrationArray ){

    return function( container, application ) {

        var getMigrations       = function( container ){
                /*  this function looks up all the migration modules defined
                    in the consuming application's namespace, loads them via the container and sorts them by version */

                /* global require */
                var migrations = migrationArray.sort( function( a, b ){
                        var aVer = a.get( 'version' ),
                            bVer = b.get( 'version' );

                        return  aVer < bVer ? -1 :
                                aVer > bVer ? 1 :
                                0;
                    });

                Ember.assert( 'You have not defined any migrations.  Run `ember generate migration --name=<migration-name>` to generate one.', migrations.length );

                return migrations;
            },
            calculateIDBVersion = function( migrations ){
                return migrations[ migrations.length -1 ].version;
            },
            makeMigrationRunner = function( migrations ){
                return function( event ){
                    console.log( 'migrations:', migrations );
                    console.log( 'ecidb:rungMigrations - event:', event );
                };
            },
            migrations          = getMigrations( container ),
            runMigrations       = makeMigrationRunner( migrations ),
            idbName             = application.get( 'indexedDBName' ),
            idbVersion          = calculateIDBVersion( migrations ),
            request;

        Ember.assert( 'IndexedDB was not detected', window.indexedDB );

        Ember.assert( '`indexedDBName` was not set in your config/environtment.json:ENV.APP.indexedDBName', idbName );

        Ember.assert( 'There was a problem calculating the current version number.', idbVersion );

        request = window.indexedDB.open( idbName, idbVersion );

        request.onupgradeneeded = runMigrations;
    };
}