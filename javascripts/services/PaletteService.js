"use strict";

app.service("PaletteService", function($http, $q, FIREBASE_CONFIG) {

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

return {getPalettes};
});