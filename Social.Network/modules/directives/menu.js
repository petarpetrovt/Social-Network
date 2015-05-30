(function () {
	"use strict";

	angular.module("app.directives").directive('menu', function () {
		return {
			restrict: 'EA',
			replace: true,
			controller: function ($scope, ProfileFactory, UtilsFactory) {
				$scope.requestsCount = 0;

				ProfileFactory.get(function (data) {
					$scope.user = data;

					if (!data.profileImageData)
						$scope.user.profileImageData = '../images/avatar.gif';
					if (!data.coverImageData)
						$scope.user.coverImageData = '../images/cover.gif';

				}, function (data) {
				});

				ProfileFactory.getFriendRequests(function (data) {
					$scope.requestsCount = data.length;
				}, function (data) {
					console.log(data);
				});
			},
			templateUrl: '../views/directives/menu.html'
		}
	});
}());