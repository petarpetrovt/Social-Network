(function () {
	"use strict";

	angular.module("app.filters").filter('profileImageFilter', function () {
		return function (input) {
			return input === null ? '../../images/avatar.gif' : input;
		};
	});
}());