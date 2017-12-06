"use strict";

// if user is not logged in delete local storage
// logout of authentication from AuthService.js and route back to login screen

app.controller("NavCtrl", function($location, $scope, $rootScope, $window, AuthService){
	$scope.logoutUser = () => {
		delete $rootScope.uid;
		$window.localStorage.clear();
		AuthService.logout();
		$location.path('/login');
	};
});