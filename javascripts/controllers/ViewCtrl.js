"use strict";

app.controller("ViewCtrl", function($location, $scope, $rootScope, ColorService, PaletteService, ColorApiService) {

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
    	ColorApiService.colorConfiguration(color).then((colorResults) => {
    		$scope.apiPalettes = colorResults.data;
    		colorResults.data.isFavorite = true;
    		colorResults.data.uid = $rootScope.uid;

    		let apiPaletteObject = PaletteService.createPaletteObjectFromApi(colorResults.data);
    		let colors = colorResults.data.colors;
    		
    		PaletteService.addNewPalette(apiPaletteObject).then((paletteResults) => {
    			let paletteId = paletteResults.data.name;
   
    			colors.forEach((color) => {
    				color.paletteId = paletteId;
    				color.uid = $rootScope.uid;
    				let apiColorObject = ColorService.createColorObjectFromApi(color);
    				ColorService.addNewColor(apiColorObject).then((noncolor) => {
    				});
    			});
    		 });
    		getThePalettes();
    	}).catch((err) => {
    		console.log("error in eventApi", err);
    	});
   	 }
   };



   $scope.favoritePalettes = (palette) =>{ 
   	let updatedPalette = {};

   		if(!palette.isFavorite) {
   			updatedPalette = PaletteService.createPrettyPaletteObject(palette);
   			updatedPalette.isFavorite = true;
   		} else {
   			updatedPalette = PaletteService.createPrettyPaletteObject(palette);
   			updatedPalette.isFavorite = false;
   		}
   		console.log("paletteId", palette.id);
   		PaletteService.updatePalette(palette.id, updatedPalette).then(() => {
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