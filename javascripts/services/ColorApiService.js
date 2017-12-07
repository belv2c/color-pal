"use strict";

app.service("ColorApiService", function($http, FIREBASE_CONFIG){
 	
	const colorConfiguration = () => {
		return $http.get(`http://www.thecolorapi.com/scheme?hex=24B1E0&mode=triad&count=6`);
	};


	return {colorConfiguration};
});