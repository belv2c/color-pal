"use strict";

app.controller("ViewCtrl", function($document, $location, $scope, $rootScope, ColorService, PaletteService, ColorApiService) {

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
			getTheColors();
		}).catch((err) => {
			console.log("error in deletePalette", err);
		});
	};

	$scope.deleteColor = (colorId) => {
			ColorService.deleteColor(colorId).then((results) => {
				console.log(colorId);
				getThePalettes();
				getTheColors();
			}).catch((err) => {
				console.log("error in deletePalette", err);
			});
		};

// AFTER CLOSE BUTTON IS HIT, CALL THE API, COMBINE PALETTE AND COLOR DATA, THEN PRINT THEM TO THE PAGE

	$scope.eventApi = {
 		   onClose:  function(api, color, $event) {
    	ColorApiService.colorConfiguration(color).then((colorResults) => {
    		$scope.apiPalettes = colorResults.data;
    		colorResults.data.isFavorite = true;
    		colorResults.data.uid = $rootScope.uid;

    		let apiPaletteObject = PaletteService.createPaletteObjectFromApi(colorResults.data);
    		let colors = colorResults.data.colors;
    		
    		PaletteService.addNewPalette(apiPaletteObject).then((paletteResults) => {
    			let paletteId = paletteResults.data.name;
  				 let counter = 1;
  				 let finalCount = 4;

    			colors.forEach((color) => {
    				color.paletteId = paletteId;
    				color.uid = $rootScope.uid;
    				let apiColorObject = ColorService.createColorObjectFromApi(color);

    				ColorService.addNewColor(apiColorObject).then((noncolor) => {
						counter ++;
						if (counter === finalCount) {
							getThePalettes();
							getTheColors();
							var someElement = angular.element(document.getElementById('colorDiv'));
    						$document.scrollToElementAnimated(someElement);
						}
    				});
    			});
    		 });
    	}).catch((err) => {
    		console.log("error in eventApi", err);
      });
   	}
  };

// SAVE PALETTE TO MY PALETTES PAGE

   $scope.favoritePalettes = (palette) =>{ 
   	let updatedPalette = {};

   		if(!palette.isFavorite) {
   			updatedPalette = PaletteService.createPaletteObjectFromApi(palette);
   			updatedPalette.isFavorite = true;
   		} else {
   			updatedPalette = PaletteService.createPaletteObjectFromApi(palette);
   			updatedPalette.isFavorite = false;
   		}
   		PaletteService.updatePalette(palette.id, updatedPalette).then(() => {
   			getThePalettes();
   		}).catch((err) => {
   			console.log("error in favoritePalettes", err);
   	  });
   	
   };

	$scope.updatePaletteAfterFormEdit = (palette) => {
		let updatedPalette = {};
		if(palette.mode) {
			updatedPalette = PaletteService.createPaletteObjectFromApi(palette);
		}
		PaletteService.updatePalette(palette.id, updatedPalette).then(() => {
			getThePalettes();
		}).catch((err) => {
			console.log("error in updatePaletteAfterFormEdit", err);
		});
	};


	// COLOR PICKER

	$scope.options = {
	    // html attributes
	    format: 'hex',
	    placeholder: 'Pick a color',
	    round: 'true',
	    show: {
	    	swatch: 'false',
	    },
	    close: {
	    	show: 'true',
	    	label: 'Close',
	    	class: 'closebtn'
	    }
	 };


});