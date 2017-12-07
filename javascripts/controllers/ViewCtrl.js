"use strict";

app.controller("ViewCtrl", function($scope, $rootScope, PaletteService) {

	const getThePalettes = () => {
		PaletteService.getPalettes($rootScope.uid).then((results) => {
			$scope.palettes = results;

		}).catch((err) => {
			console.log("error in getThePalettes", err);
		});
	};
	getThePalettes();
    



});