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
				controller: 'homeController'
			})
			.when('/users/:username', {
				templateUrl: 'views/wall.html',
				controller: 'wallController'
			})
			.when('/profile', {
				templateUrl: 'views/editProfile.html',
				controller: 'editProfileController'
			})
			.when('/profile/password', {
				templateUrl: 'views/changePassword.html',
				controller: 'editPasswordController'
			})
			.otherwise({ redirectTo: '/' });
	});

	//app.run(function ($rootScope) {
	//	$rootScope.showMenu = false;
	//});
}());