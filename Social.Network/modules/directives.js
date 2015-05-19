(function () {
	"use strict";

	var app = angular.module("app.directives", []);

	app.directive('posts', function () {
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				datasource: '=',
			},
			controller: function ($scope, ProfileFactory) {
				$scope.posts = [];

				ProfileFactory.getNewsFeed(null, 10, function (data) {
					console.log(data);
				}, function () {
					console.log(data);
				});
			},
			templateUrl: '../views/directives/posts.html'
		}
	});

	app.directive('search', function () {
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				'search': '&onSearch'
			},
			controller: function ($scope) {
				$scope.search = function () {
					console.log('asd');
				};

				$scope.doSearch = function () {
					console.log('asdasdas');
				};
			},
			templateUrl: '../views/directives/search.html'
		}
	});
}());