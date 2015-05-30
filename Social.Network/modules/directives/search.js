(function () {
	"use strict";

	angular.module("app.directives").directive('search', function () {
		return {
			restrict: 'EA',
			replace: true,
			controller: function ($scope, $location, UsersFactory) {
				$scope.value = null;

				$scope.viewPerson = function (username) {
					$location.path('/users/' + username);
					clear();
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
					clear();
				};

				function clear() {
					$scope.showClear = false;
					$scope.value = null;
					$scope.results = null;
				}
			},
			templateUrl: '../views/directives/search.html'
		}
	});
}());