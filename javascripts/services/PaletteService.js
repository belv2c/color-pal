"use strict";

app.service("PaletteService", function($http, $q, $rootScope, FIREBASE_CONFIG, ColorService) {

// GET INDIVIDUAL PALETTES
const getPalettes = (userUid) => {
		let palettesArray = [];
		return $q ((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/palettes.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
				let fbPalettes = results.data;
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

// GET FAVORITE PALETTES

const getFavoritePalettes = (userUid) => {
		let palettesArray = [];
		return $q ((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/palettes.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
				let fbPalettes = results.data;
				Object.keys(fbPalettes).forEach((key) => {
					fbPalettes[key].id = key;
					if (fbPalettes[key].isFavorite) {
					palettesArray.push(fbPalettes[key]);
					}
					resolve(palettesArray);
				});
			}).catch((err) => {
				console.log("error in getFavoritePalettes", err);
			});
		});
	};

	const createPaletteObject = (newpalette) => {
			return {
			"mode": newpalette.mode,
			"count": newpalette.count,
			"isFavorite": newpalette.isFavorite,
			"uid": newpalette.uid
		};
	};



const addNewPalette = (newPalette) => {
		return $http.post(`${FIREBASE_CONFIG.databaseURL}/palettes.json`, JSON.stringify(newPalette));
	};

const deletePalette = (paletteId) => {
		return $http.delete(`${FIREBASE_CONFIG.databaseURL}/palettes/${paletteId}.json`);
	};

const updatePalette = (updatedPalette, paletteId) => {
		return $http.put(`${FIREBASE_CONFIG.databaseURL}/palettes/${paletteId}.json`, JSON.stringify(updatedPalette));
	};


return {getPalettes, getFavoritePalettes, addNewPalette, deletePalette, updatePalette, createPaletteObject};
});

