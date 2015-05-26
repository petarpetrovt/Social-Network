(function () {
	"use strict";

	var app = angular.module("app.directives", []);

	app.directive('posts', function () {
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				posts: '=',
			},
			templateUrl: '../views/directives/posts.html'
		}
	});

	app.directive('search', function () {
		return {
			restrict: 'EA',
			replace: true,
			controller: function ($scope, $location, UsersFactory) {
				$scope.value = null;

				$scope.viewPerson = function (username) {
					$location.path('/users/' + username);
				};

				$scope.search = function () {
					var value = $scope.value.trim();
					$scope.showClear = false;

					if (!value)
						return;

					$scope.showClear = true;

					UsersFactory.search($scope.value, function (data) {
						$scope.results = data;
					}, function (data) {
						console.log(data);
					});
				};

				$scope.clear = function () {
					$scope.showClear = false;
					$scope.value = null;
					$scope.results = null;
				};
			},
			templateUrl: '../views/directives/search.html'
		}
	});

	app.directive('menu', function () {
		return {
			restrict: 'EA',
			replace: true,
			controller: function ($scope, ProfileFactory, UtilsFactory) {
				ProfileFactory.get(function (data) {
					$scope.user = data;

					if (!data.profileImageData)
						$scope.user.profileImageData = '../images/avatar.gif';
					if (!data.coverImageData)
						$scope.user.coverImageData = '../images/cover.gif';

				}, function (data) {
				});
			},
			templateUrl: '../views/directives/menu.html'
		}
	});
}());