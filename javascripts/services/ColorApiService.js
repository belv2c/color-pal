"use strict";

app.service("ColorApiService", function($http, FIREBASE_CONFIG){
 

	const colorConfiguration = (color) => {
		return $http.get(`https://color-api-app.herokuapp.com/api/colors/scheme?hex=${color}&mode=quad&count=4`);
	};
colorConfiguration();

	return {colorConfiguration};
});