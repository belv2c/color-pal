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
    

    $scope.color = '#FF0000';

// options - if a list is given then choose one of the items. The first item in the list will be the default
$scope.options = {
    // html attributes

    // color
    format: 'hex',
 };


});