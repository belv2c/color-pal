"use strict";

// calls isAuthenticated in AuthService and wraps the call in a function
// if isAuthenticated = true it resolves and if false it rejects
let isAuth = (AuthService) => new Promise ((resolve, reject) => {
	if (AuthService.isAuthenticated()){
		resolve();
	} else {
		reject();
	}
});

app.value('duScrollDuration', 2000);
app.value('duScrollOffset', 100);

//runs one time per application after the app config
app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthService, ColorApiService, editableOptions){
	firebase.initializeApp(FIREBASE_CONFIG);
	editableOptions.theme = 'bs3';

$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
	var logged = AuthService.isAuthenticated();
	
	var appTo;

	if (currRoute.originalPath) {
		appTo = currRoute.originalPath.indexOf('/auth') !== -1;
	}

	if (!appTo && !logged) {
		event.preventDefault();
		$location.path('/auth');
	}
  });
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
			controller: 'InfoCtrl',
			resolve: {isAuth}
		})
		.when("/mypalettes", {
			// path to html file and path to javascript file
			templateUrl: 'partials/mypalettes.html',
			controller: 'MyPalettesCtrl',
			resolve: {isAuth}
		})
		.when("/view", {
			// path to html file and path to javascript file
			templateUrl: 'partials/view.html',
			controller: 'ViewCtrl',
			resolve: {isAuth}
		})
		
		// if your user tries to type in any other route besides what you've defined you can redirect them
		.otherwise('/auth');
});