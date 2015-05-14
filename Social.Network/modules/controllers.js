(function () {
	"use strict";

	var app = angular.module("app.controllers", []);

	app.controller("homeController", function ($scope, AuthenticationFactory) {
		$scope.isLoginForm = true;
		$scope.loginLinkClass = 'active';

		$scope.showLogin = function () {
			$scope.isLoginForm = true;
			$scope.loginLinkClass = 'active';
			$scope.registerLinkClass = '';
		};

		$scope.showRegister = function () {
			$scope.isLoginForm = false;
			$scope.loginLinkClass = '';
			$scope.registerLinkClass = 'active';
		};
	});

	app.controller("loginController", function ($scope) {

	});
}());