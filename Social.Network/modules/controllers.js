(function () {
	"use strict";

	var app = angular.module("app.controllers", []);

	app.controller("homeController", function ($scope, AuthenticationFactory) {
		$scope.time = new Date().toString();
		$scope.isLogged = AuthenticationFactory.isLogged();
	});
}());