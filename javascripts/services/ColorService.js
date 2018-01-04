"use strict";

app.service("ColorService", function($http, $q, FIREBASE_CONFIG) {

const getColors = (userUid) => {
		let colorsArray = [];
		return $q ((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/colors.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
				let fbColors = results.data;
				Object.keys(fbColors).forEach((key) => {
					fbColors[key].id = key;
					colorsArray.push(fbColors[key]);
					});
					resolve(colorsArray);
			}).catch((err) => {
				console.log("error in getPalettes", err);
			});
		});
	};

	const createColorObjectFromApi = (color) => {
		return {
			"paletteId": color.paletteId,
			"name": color.name.value,
			"hex": color.hex.value,
			"rgb": color.rgb.value,
			"clean": color.hex.clean,
			"image": color.image.bare,
			"uid": color.uid
		};
	};



const addNewColor = (newColor) => {
	return $http.post(`${FIREBASE_CONFIG.databaseURL}/colors.json`, JSON.stringify(newColor));	
};

const deleteColor = (colorId) => {
		return $http.delete(`${FIREBASE_CONFIG.databaseURL}/colors/${colorId}.json`);
	};



return {getColors, addNewColor, deleteColor, createColorObjectFromApi};
});