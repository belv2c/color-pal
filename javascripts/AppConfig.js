"use strict";

// runs one time per application after the app config
app.run(function( $rootScope, $location, FIREBASE_CONFIG){
	firebase.initializeApp(FIREBASE_CONFIG);

});

// routes
app.config(function($routeProvider){
	$routeProvider
		.when("/auth", {
			// path to html file and path to javascript file
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
		})
		.when("/info", {
			// path to html file and path to javascript file
			templateUrl: 'partials/info.html',
			controller: 'InfoCtrl'
		})
		.when("/mypalettes", {
			// path to html file and path to javascript file
			templateUrl: 'partials/mypalettes.html',
			controller: 'MyPalettesCtrl'
		})
		.when("/view", {
			// path to html file and path to javascript file
			templateUrl: 'partials/view.html',
			controller: 'ViewCtrl'
		})
		
		// if your user tries to type in any other route besides what you've defined you can redirect them
		.otherwise('/auth');
});