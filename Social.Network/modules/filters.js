(function () {
	"use strict";

	var app = angular.module("app.filters", []);

	app.filter('interpolate', function (version) {
		return function (text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		}
	});
}());