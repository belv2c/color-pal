"use strict";

app.service("ColorApiService", function($http, FIREBASE_CONFIG){
 

	const colorConfiguration = (color) => {
		return $http.get(`http://www.thecolorapi.com/scheme?hex=${color}&mode=monochrome&count=4`);
	};
colorConfiguration();

	return {colorConfiguration};
});