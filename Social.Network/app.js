(function () {
	"use strict";

	var app = angular.module('SocialNetwork', [
	  "app.controllers",
	  "app.services",
	  "app.directives",
	  "app.filters",
	  "ngRoute",
	  "ngResource"
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
				controller: 'wallController'
			})
			.when('/friends', {
				templateUrl: 'views/friends.html',
				controller: 'HomeController'
			})
			.when('/profile', {
				templateUrl: 'views/user/editProfile.html',
				controller: 'UsersController'
			})
			.when('/profile/password', {
				templateUrl: 'views/user/changePassword.html',
				controller: 'UsersController'
			})
			.otherwise({ redirectTo: '/' });
	});

	app.run(function ($rootScope, $location, UtilsFactory) {
		$rootScope.isLogged = function () {
			return UtilsFactory.isLogged();
		};

		$rootScope.$on('$locationChangeStart', function () {
			//if ($location.path().indexOf("welcome") === -1 && !UtilsFactory.isLogged()) {
			//	$location.path("/");
			//}
			//if ($location.path().indexOf("welcome") !== -1 && UtilsFactory.isLogged()) {
			//	$location.path("/feed");
			//}
		});
	});
}());