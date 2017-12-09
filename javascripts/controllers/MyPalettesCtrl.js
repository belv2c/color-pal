"use strict";

app.controller("MyPalettesCtrl", function($location, $rootScope, $scope, PaletteService) {
	

	const getFavoriteFbPalettes = () => {
		PaletteService.getFavoritePalettes($rootScope.uid).then((results) => {
			$scope.palettes = results;
		}).catch((err) => {
			console.log("error in getContacts", err);
		});
		
	};

getFavoriteFbPalettes();



});