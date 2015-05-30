(function () {
	"use strict";

	var app = angular.module('SocialNetwork', [
	  "app.controllers",
	  "app.factories",
	  "app.directives",
	  "app.filters",
	  "ngRoute",
	  "ngResource",
	  "ui.bootstrap",
	  "infinite-scroll"
	]);

	app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');

	app.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html',
				controller: 'HomeController'
			})
			.when('/users/:username', {
				templateUrl: 'views/wall.html',
				controller: 'WallController'
			})
			.when('/friends', {
				templateUrl: 'views/friends.html',
				controller: 'HomeController'
			})
			.when('/profile', {
				templateUrl: 'views/editProfile.html',
				controller: 'UsersController'
			})
			.when('/profile/password', {
				templateUrl: 'views/changePassword.html',
				controller: 'UsersController'
			})
			.otherwise({ redirectTo: '/' });
	});

	app.run(function ($rootScope, $routeParams, $location, UtilsFactory) {
		$rootScope.isLogged = function () {
			return UtilsFactory.isLogged();
		};

		$rootScope.isMe = function (username) {
			return UtilsFactory.isMe(username);
		};

		$rootScope.isMyWall = function () {
			if ($routeParams.username) {
				return UtilsFactory.isMe($routeParams.username);
			}
			else
				return false;
		};

		$rootScope.$on('$locationChangeStart', function () {
			if ($location.path().length > 2 && !UtilsFactory.isLogged()) {
				$location.path("/");
			}
		});
	});
}());