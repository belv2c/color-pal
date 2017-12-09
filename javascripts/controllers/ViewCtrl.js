"use strict";

app.controller("ViewCtrl", function($scope, $rootScope, ColorService, PaletteService, ColorApiService) {

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


	$scope.deletePalette = (paletteId) => {
		PaletteService.deletePalette(paletteId).then((results) => {
			getThePalettes();
		}).catch((err) => {
			console.log("error in deletePalette", err);
		});
	};



	$scope.paletteObject = (newpalette, newcolor) => {
		$scope.updatedPalette = {
			"mode": newpalette.mode,
			"name": newcolor.name,
			"count": newpalette.count,
			"isFavorite": newpalette.isFavorite,
			"uid": $rootScope.uid
		};
	};

	$scope.colorObject = (newcolor) => {
		$scope.updatedColor = {
			"paletteId": newcolor.paletteId,
			"name": newcolor.name,
			"hex": newcolor.hex,
			"clean": newcolor.clean,
			"image": newcolor.image,
			"uid": $rootScope.uid
		};
	};

$scope.apiPalettes = [];

	$scope.eventApi = {
 		   onChange:  function(api, color, $event) {
    	ColorApiService.colorConfiguration(color).then((results) => {
    		$scope.apiPalettes = results.data;
    	}).catch((err) => {
    		console.log("error in eventApi", err);
    	});
   	 }
   };

    
	// COLOR PICKER

	$scope.options = {
	    // html attributes
	    format: 'hex',
	    placeholder: 'Pick a color',
	    round: 'true'
	 };

});