var mfgs = [
    {
        name: 'ford',
        models: [ 'mustang', 'thunderbird', 'escort', 'focus', 'f150' ],
        created: new Date( '1901-01-01')
    },
    {
        name: 'chevy',
        models: [ 'corvette', 'malibu', 'silverado' ],
        created: new Date( '1921-01-01')

    },
    {
        name: 'dodge',
        models: [ 'dart', 'challenger', 'charger', 'ram' ],
        created: new Date( '1931-01-01')

    },
    {
        name: 'toyota',
        models: [ '4runner', 'corolla', 'matrix', 'yaris', 'prius' ],
        created: new Date( '1941-01-01')
    },
    {
        name: 'bmw',
        models: [ 'm3', 'm5', 'm6'],
        created: new Date( '1951-01-01')
    }
];

var models = [
    {
        name: 'mustang',
        mfg: 'ford'
    },
    {
        name: 'thunderbird',
        mfg: 'ford'
    },
    {
        name: 'escort',
        mfg: 'ford'
    },
    {
        name: 'focus',
        mfg: 'ford'
    },
    {
        name: 'f150',
        mfg: 'ford'
    },
    {
        name: 'corvette',
        mfg: 'chevy'
    },
    {
        name: 'malibu',
        mfg: 'chevy'
    },
    {
        name: 'silverado',
        mfg: 'chevy'
    },
    {
        name: 'dart',
        mfg: 'dodge'
    },
    {
        name: 'challenger',
        mfg: 'dodge'
    },
    {
        name: 'charger',
        mfg: 'dodge'
    },
    {
        name: 'ram',
        mfg: 'dodge'
    },
    {
        name: '4runner',
        mfg: 'toyota'
    },
    {
        name: 'corolla',
        mfg: 'toyota'
    },
    {
        name: 'matrix',
        mfg: 'toyota'
    },
    {
        name: 'yaris',
        mfg: 'toyota'
    },
    {
        name: 'prius',
        mfg: 'toyota'
    },
    {
        name: 'm3',
        mfg: 'bmw'
    },
    {
        name: 'm5',
        mfg: 'bmw'
    },
    {
        name: 'm6',
        mfg: 'bmw'
    }
];


export default {
    version: 1,
    migrate: function( db ){
        console.log( 'migration v.1 function' );
    }
};