(function () {
	"use strict";

	var app = angular.module("app.controllers", []);

	app.controller("homeController", function ($scope, UsersFactory, UtilsFactory) {
		if (UtilsFactory.isLogged()) {
			$scope.menu = 'views/forms/menu.html';
			$scope.newsFeed = 'views/newsFeed.html';
			return;
		}

		$scope.showTitle = true;
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

	app.controller("loginController", function ($scope, UsersFactory, UtilsFactory) {
		$scope.username = '';
		$scope.password = '';
		$scope.remember = '';

		$scope.login = function ($event) {
			if (!$scope.username || !$scope.password)
				return;

			UsersFactory.login($scope.username, $scope.password,
				function (data) {
					UtilsFactory.setCredentials(data);
					UtilsFactory.refresh();
					$.notify('You have successfully logged in.', 'success');
				}, function () {
					$.notify('The username or password is incorrect.', 'error');
				});
		};
	});

	app.controller("registerController", function ($scope, UsersFactory, UtilsFactory) {
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
				UtilsFactory.refresh();
				$.notify('You have successfully registered and logged in.', 'success');
			}, function () {
				$.notify('Registration data is incorrect.', 'error');
			});
		};
	});

	app.controller("menuController", function ($scope, UtilsFactory, UsersFactory, ProfileFactory) {
		if (UtilsFactory.isLogged()) {
			$scope.showMenu = true;
			$scope.profileImage = 'images/avatar.gif';

			ProfileFactory.get(function (data) {
				$scope.fullName = data.name;
				$scope.username = data.username;
			}, function (data) {
				console.log(data);
			});

			$scope.logout = function () {
				UsersFactory.logout(function () {
					UtilsFactory.clearCredentials();
					UtilsFactory.refresh();
					$.notify('You have successfully logged out.', 'success');
				}, function () {
					$.notify('Error logging out.', 'error');
				});
			};
		}
	});

	app.controller("newsFeedController", function ($scope, PostsFactory, UtilsFactory) {
		$scope.username = UtilsFactory.getUsername();
	});

	app.controller("wallController", function ($scope, $location, $routeParams, UsersFactory, UtilsFactory) {
		var username = $routeParams.username;
		if (!UtilsFactory.isLogged() || !username)
			$location.path('/');

		$scope.menu = 'views/forms/menu.html';

		//coverImageData
		//gender
		//hasPendingRequest
		//isFrined
		//name
		//profileImageData
		//username
		UsersFactory.get(username, function (data) {
			if (!data.coverImageData)
				$scope.default = 'cover-default';
			else
				$scope.coverImageData = data.coverImageData;

		}, function (data) {
			console.log(data);
		});

		$scope.username = username;
	});

	app.controller("editProfileController", function ($scope, $location, UtilsFactory, ProfileFactory) {
		if (!UtilsFactory.isLogged())
			$location.path('/');

		$scope.menu = 'views/forms/menu.html';

		ProfileFactory.get(function (data) {
			$scope.email = data.email;
			$scope.name = data.name;
			$scope.gender = data.gender;

			if (!data.profileImageData && data.profileImageData != null)
				$scope.profileImage = data.profileImageData;
			else
				$scope.profileImage = '../../images/avatar.gif';

			if (!data.coverImageData && data.coverImageData != null)
				$scope.coverImageData = data.coverImageData;
			else
				$scope.default = 'cover-default';
		}, function (data) {
			console.log(data);
		});


		$scope.edit = function () {
			var data = {
				name: $scope.name,
				email: $scope.email,
				gender: $scope.gender
			};
			console.log(data);
			ProfileFactory.update(data, function (data) {
				$location.path('/');
				$.notify('You have successfully edited your profile.', 'success');
			}, function (data) {
				console.log(data);
			});
		};
	});

	app.controller("editPasswordController", function ($scope, $location, UtilsFactory) {
		if (!UtilsFactory.isLogged())
			$location.path('/');

		$scope.menu = 'views/forms/menu.html';
	});
}());