import Ember from 'ember';

export default Ember.Object.create({
	version: 1,
	migration: function( db, transaction ){
		console.log( 'migration v.1 function' );
	}
});