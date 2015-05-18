(function () {
	"use strict";

	var app = angular.module("app.controllers", []);

	app.controller("homeController", function ($scope, UsersFactory, UtilsFactory) {
		if (UtilsFactory.isLogged()) {
			$scope.newsFeed = 'views/newsFeed.html';
			return;
		}

		$scope.logInLink = true;
		$scope.registerLink = false;
		$scope.loginForm = 'views/forms/loginForm.html';

		$scope.showLogin = function () {
			$scope.loginForm = 'views/forms/loginForm.html';
			$scope.registerForm = '';
		};

		$scope.showRegister = function () {
			$scope.registerForm = 'views/forms/registerForm.html';
			$scope.loginForm = '';
		};
	});

	app.controller("loginController", function ($scope, $route, UsersFactory, UtilsFactory) {
		$scope.username = '';
		$scope.password = '';
		$scope.remember = '';

		$scope.login = function ($event) {
			if (!$scope.username || !$scope.password)
				return;

			UsersFactory.login($scope.username, $scope.password,
				function (data) {
					UtilsFactory.setCredentials(data);
					$route.reload();
					$.notify('You have successfully logged in.', 'success');
				}, function () {
					$.notify('The username or password is incorrect.', 'error');
				});
		};
	});

	app.controller("registerController", function ($scope, $route, UsersFactory, UtilsFactory) {
		$scope.fullName = '';
		$scope.email = '';
		$scope.username = '';
		$scope.password = '';
		$scope.confirmPassword = '';
		$scope.gender = '0';

		$scope.register = function () {
			if (!$scope.username
				|| !$scope.password
				|| !$scope.email
				|| !$scope.fullName
				|| !$scope.gender)
				return;

			UsersFactory.register({
				Username: $scope.username,
				Password: $scope.password,
				ConfirmPassword: $scope.confirmPassword,
				Name: $scope.fullName,
				Email: $scope.email,
				Gender: $scope.gender
			}, function (data) {
				UtilsFactory.setCredentials(data);
				$route.reload();
				$.notify('You have successfully registered and logged in.', 'success');
			}, function () {
				$.notify('Registration data is incorrect.', 'error');
			});
		};
	});

	app.controller("newsFeedController", function ($scope, $route, UsersFactory, PostsFactory, UtilsFactory) {
		$scope.username = UtilsFactory.getUsername();
		$scope.logout = function () {
			UsersFactory.logout(function () {
				$route.reload();
				$.notify('You have successfully logged out.', 'success');
			}, function () {
				$.notify('Error logging out.', 'error');
			});
			UtilsFactory.clearCredentials();
		};

		$scope.post = function () {
			PostsFactory.createPost('Test', function (data) {
				console.log(data);
			}, function () {
			});
		};

		$scope.getPost = function () {
			PostsFactory.getPost(173, function (data) {
				console.log(data);
			}, function () {
			});
		};
	});
}());