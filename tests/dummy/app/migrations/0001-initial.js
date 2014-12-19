import Ember from 'ember';

export default Ember.Object.extend({
	version: 1,
	migration: function(){
		console.log( 'migration v.1 function' );
	}
});