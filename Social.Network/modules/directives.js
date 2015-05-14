(function () {
	"use strict";

	var app = angular.module("app.directives", []);

	app.directive('inputtext', function ($timeout) {
		return {
			restrict: 'E',
			replace: true,
			template: '<input type="text"/>',
			scope: {
				//if there were attributes it would be shown here
			},
			link: function (scope, element, attrs, ctrl) {
				// DOM manipulation may happen here.
			}
		}
	});

	app.directive('version', function (version) {
		return function (scope, elm, attrs) {
			elm.text(version);
		};
	});
}());