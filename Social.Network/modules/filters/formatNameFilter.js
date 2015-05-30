(function () {
	"use strict";

	angular.module("app.filters").filter('formatNameFilter', function () {
		return function (input) {
			return input.length > 15 ? input.substring(0, 15).trim() + '...' : input.trim();
		};
	});
}());