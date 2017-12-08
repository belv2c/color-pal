"use strict";

app.service("PaletteService", function($http, $q, $rootScope, FIREBASE_CONFIG, ColorService) {

// GET INDIVIDUAL PALETTES
const getPalettes = (userUid) => {
		let palettesArray = [];
		return $q ((resolve, reject) => {

			$http.get(`${FIREBASE_CONFIG.databaseURL}/palettes.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
				let fbPalettes = results.data;
				console.log(fbPalettes);
				Object.keys(fbPalettes).forEach((key) => {
					fbPalettes[key].id = key;
					palettesArray.push(fbPalettes[key]);
					});

					resolve(palettesArray);

			}).catch((err) => {
				console.log("error in getPalettes", err);
			});
		});
	};

const addNewPalette = (newPalette) => {
		return $http.post(`${FIREBASE_CONFIG.databaseURL}/palettes.json`, JSON.stringify(newPalette));
	};

	






return {getPalettes, addNewPalette};
});

