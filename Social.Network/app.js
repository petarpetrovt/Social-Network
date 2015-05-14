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
			.when('/FriendRequests', {
				templateUrl: 'views/friendRequests.html',
				controller: 'MainController'
			})
			.when('/Search/:id', {
				templateUrl: 'views/searchResults.html',
				controller: 'MainController'
			})
			.when('/EditProfile', {
				templateUrl: 'views/editProfile.html',
				controller: 'MainController'
			})
			.when('/ChangePassword', {
				templateUrl: 'views/changePassword.html',
				controller: 'MainController'
			})
			.when('/Login', {
				templateUrl: 'views/login.html',
				controller: 'MainController'
			})
			.when('/Register', {
				templateUrl: 'views/register.html',
				controller: 'MainController'
			})
			.otherwise({ redirectTo: '/' });
	});
}());