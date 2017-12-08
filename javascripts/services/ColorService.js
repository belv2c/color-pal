"use strict";

app.service("ColorService", function($http, $q, FIREBASE_CONFIG) {

const getColors = (userUid) => {
		let colorsArray = [];
		return $q ((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/colors.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
				let fbColors = results.data;
				console.log(fbColors);
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



const addNewColor = (newColor) => {
	return $http.post(`${FIREBASE_CONFIG.databaseURL}/colors.json`, JSON.stringify(newColor));
};



return {getColors, addNewColor};
});