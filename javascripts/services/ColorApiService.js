"use strict";

app.service("ColorApiService", function($http, FIREBASE_CONFIG){
 	
	const colorConfiguration = (color) => {
		return $http.get(`http://www.thecolorapi.com/scheme?hex=${color}&mode=triad&count=6`);
	};
colorConfiguration();

	return {colorConfiguration};
});