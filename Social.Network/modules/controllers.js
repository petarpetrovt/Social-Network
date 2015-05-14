(function () {
	"use strict";

	var app = angular.module("app.controllers", []);

	app.controller("homeController", function ($scope) {
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

	app.controller("loginController", function ($scope, AuthenticationFactory) {
		$scope.username = '';
		$scope.password = '';
		$scope.remember = '';

		$scope.login = function ($event) {
			if (!$scope.username || !$scope.password)
				return;

			AuthenticationFactory.login($scope.username, $scope.password,
				function (data) {
					console.log(data);
					$.notify('You have successfully logged in.', 'success');
				}, function () {
					$.notify('The username or password is incorrect.', 'error');
				});
		};
	});

	app.controller("registerController", function ($scope, AuthenticationFactory) {
		$scope.fullName = '';
		$scope.email = '';
		$scope.username = '';
		$scope.password = '';
		$scope.confirmPassword = '';
		$scope.gender = '0';

		$scope.register = function ($event) {
			if (!$scope.username
				|| !$scope.password
				|| !$scope.email
				|| !$scope.fullName
				|| !$scope.gender)
				return;

			AuthenticationFactory.register({
				Username: $scope.username,
				Password: $scope.password,
				ConfirmPassword: $scope.confirmPassword,
				Name: $scope.fullName,
				Email: $scope.email,
				Gender: $scope.gender
			}, function (data) {
				console.log(data);
				$.notify('You have successfully registered and logged in.', 'success');
			}, function () {
				$.notify('Registration data is incorrect.', 'error');
			});
		};
	});
}());