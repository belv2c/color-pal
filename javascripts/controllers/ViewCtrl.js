"use strict";

app.controller("ViewCtrl", function($scope, $rootScope, ColorService, PaletteService) {

	const getThePalettes = () => {
		PaletteService.getPalettes($rootScope.uid).then((results) => {
			$scope.palettes = results;

		}).catch((err) => {
			console.log("error in getThePalettes", err);
		});
	};
	getThePalettes();

	const getTheColors = () => {
		ColorService.getColors($rootScope.uid).then((results) => {
			$scope.colors = results;
		}).catch((err) => {
			console.log("error in getTheColors", err);
		});
	};
	getTheColors();


	$scope.paletteObject = (newpalette) => {
		$rootScope.updatedPalette = {
			"mode": newpalette.mode,
			"count": newpalette.count,
			"isFavorite": newpalette.isFavorite,
			"uid": $rootScope.uid
		};
	};

    
	// COLOR PICKER
    $scope.color = '#FF0000';
	$scope.options = {
	    // html attributes
	    format: 'hex',
	    placeholder: 'Pick a color',
	    round: 'true'
	 };

});