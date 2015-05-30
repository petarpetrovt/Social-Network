(function () {
	"use strict";

	angular.module("app.directives").directive('friends', function () {
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				data: '=',
			},
			templateUrl: 'views/directives/friendsPreview.html'
		}
	});
}());