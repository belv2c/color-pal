"use strict";

app.controller("ViewCtrl", function($scope, $rootScope, $routeParams, ColorService, PaletteService, ColorApiService) {

$scope.apiPalettes = [];

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


	$scope.eventApi = {
 		   onChange:  function(api, color, palettes, $event) {
    	ColorApiService.colorConfiguration(color).then((results) => {
    		$scope.apiPalettes = results.data;
    		results.data.isFavorite = true;
    		results.data.uid = $rootScope.uid;
    		let apiPaletteObject = PaletteService.createPaletteObjectFromApi(results.data);
    		PaletteService.addNewPalette(apiPaletteObject);
    		getThePalettes();
    	}).catch((err) => {
    		console.log("error in eventApi", err);
    	});
   	 }
   };


   $scope.favoritePalettes = (palette, paletteId) =>{ 
   	let updatedPalette = {};

   		
   		if(!palette.isFavorite) {
   			updatedPalette = PaletteService.createPrettyPaletteObject(palette);
   		} else {
   			updatedPalette = PaletteService.createPrettyPaletteObject(palette);
   			updatedPalette.isFavorite = false;
   		}
   		PaletteService.updatePalette(paletteId, updatedPalette).then(() => {
   			getThePalettes();

   		}).catch((err) => {
   			console.log("error in favoritePalettes", err);
   		});
   	
   };



	// COLOR PICKER

	$scope.options = {
	    // html attributes
	    format: 'hex',
	    placeholder: 'Pick a color',
	    round: 'true'
	 };

});