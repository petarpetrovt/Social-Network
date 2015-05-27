(function () {
	"use strict";

	var app = angular.module("app.controllers", []);

	app.controller("AuthenticationController", function ($scope, $location, UsersFactory, UtilsFactory) {
		$scope.fullName = '';
		$scope.email = '';
		$scope.username = '';
		$scope.password = '';
		$scope.remember = '';
		$scope.confirmPassword = '';
		$scope.gender = '0';

		$scope.login = function () {
			if (!$scope.username || !$scope.password)
				return;

			UsersFactory.login($scope.username, $scope.password,
				function (data) {
					UtilsFactory.setCredentials(data);
					$location.path('/');
					UtilsFactory.refresh();
					$.notify('You have successfully logged in.', 'success');
				}, function () {
					$.notify('The username or password is incorrect.', 'error');
				});
		};

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
				$location.path('/');
				UtilsFactory.refresh();
				$.notify('You have successfully registered and logged in.', 'success');
			}, function () {
				$.notify('Registration data is incorrect.', 'error');
			});
		};

		$scope.logout = function () {
			UsersFactory.logout(function () {
				UtilsFactory.clearCredentials();
				$location.path('/');
				UtilsFactory.refresh();
				$.notify('You have successfully logged out.', 'success');
			}, function () {
				$.notify('Error logging out.', 'error');
			});
		};
	});

	app.controller("HomeController", function ($scope, UsersFactory, ProfileFactory, PostsFactory, UtilsFactory) {
		$scope.textModel = "";

		if (UtilsFactory.isLogged()) {
			$scope.main = 'views/feed.html';

			ProfileFactory.getNewsFeed(null, 10, function (data) {
				$scope.feed = data;
			}, function () {
				console.log(data);
			});

			ProfileFactory.getFriends(function (data) {
				$scope.friends = data;
			}, function (data) {
				console.log(data);
			});

			ProfileFactory.getFriendRequests(function (data) {
				$scope.friendRequests = data;
			}, function (data) {
				console.log(data);
			});

			$scope.post = function (text) {
				if (text) {
					PostsFactory.create(text, function (data) {
						console.log(data);
					}, function (data) {
						console.log(data);
					});
				}
			};

			$scope.accept = function (id, name) {
				ProfileFactory.acceptFriendRequest(id, function (data) {
					$.notify('You have successfully added ' + name + ' to your friends.', 'success');
					UtilsFactory.refresh();
				}, function (data) {
					console.log(data);
				});
			};

			$scope.reject = function (id, name) {
				ProfileFactory.rejectFriendRequest(id, function (data) {
					$.notify('You have successfully rejected ' + name + '.', 'warning');
					UtilsFactory.refresh();
				}, function (data) {
					console.log(data);
				});
			};

			$scope.remove = function (user) {
				ProfileFactory.removeFriend(user.username, function (data) {
					$.notify('You have successfully removed ' + user.name + ' from your friends.', 'warning');
					UtilsFactory.refresh();
				}, function (data) {
					console.log(data);
				});
			};
		}
		else {
			$scope.form = 'views/partials/login.html';
			$scope.isLogin = true;

			$scope.showLogin = function () {
				$scope.form = 'views/partials/login.html';
				$scope.isLogin = true;
			};

			$scope.showRegister = function () {
				$scope.form = 'views/partials/register.html';
				$scope.isLogin = false;
			};
		}
	});

	app.controller("WallController", function ($scope, $location, $routeParams, ProfileFactory, UsersFactory, UtilsFactory) {
		var username = $routeParams.username;
		if (!username) {
			$location.path('/');
		}

		$scope.username = username;

		UsersFactory.getUserPosts(username, null, 10, function (data) {
			$scope.userPosts = data;
		}, function (data) {
			console.log(data);
		});

		UsersFactory.get(username, function (data) {
			if (!data.coverImageData)
				$scope.default = 'cover-default';
			else
				$scope.coverImageData = data.coverImageData;

			if (!data.profileImageData)
				$scope.profileImageData = '../../images/avatar.gif';
			else
				$scope.profileImageData = data.profileImageData;

			$scope.name = data.name;

			if (UtilsFactory.isMe(username) || data.hasPendingRequest)
				$scope.isFriend = true;
			else
				$scope.isFriend = data.isFriend;
		}, function (data) {
			console.log(data);
		});

		$scope.request = function () {
			ProfileFactory.sendFriendRequest(username, function (data) {
				$.notify('You have successfully sended friend request to ' + username + '.', 'success');
				UtilsFactory.refresh();
			}, function (data) {
				console.log(data);
			});
		};
	});

	app.controller("UsersController", function ($scope, $location, UtilsFactory, ProfileFactory) {
		ProfileFactory.get(function (data) {
			$scope.email = data.email;
			$scope.name = data.name;
			$scope.gender = data.gender;

			if (data.profileImageData)
				$scope.profileImageData = data.profileImageData;
			else
				$scope.profileImageData = '../../images/avatar.gif';

			if (data.coverImageData)
				$scope.coverImageData = data.coverImageData;
			else
				$scope.default = 'cover-default';
		}, function (data) {
			console.log(data);
		});

		$scope.oldPassword = '';
		$scope.newPassword = '';
		$scope.conPassword = '';

		$scope.changePassword = function () {
			if (!$scope.oldPassword
				|| !$scope.newPassword
				|| !$scope.conPassword)
				return;

			ProfileFactory.changePassword($scope.oldPassword, $scope.newPassword,
				$scope.conPassword, function (data) {
					$location.path('/');
					UtilsFactory.refresh();
					$.notify('You have successfully changed your password.', 'success');
				}, function (data) {
					console.log(data);
				});
		};

		$scope.edit = function () {
			var data = {
				name: $scope.name,
				email: $scope.email,
				gender: $scope.gender,
				profileImageData: $scope.profileImageData,
				coverImageData: $scope.coverImageData,
			};

			ProfileFactory.update(data, function (data) {
				$location.path('/');
				UtilsFactory.refresh();
				$.notify('You have successfully edited your profile.', 'success');
			}, function (data) {
				console.log(data);
			});
		};

		$scope.profileImageUploaded = function (uploader) {
			handleUploadImage(uploader.files[0], function (result) {
				$scope.profileImageData = result;
			});
		};

		$scope.coverImageUploaded = function (uploader) {
			handleUploadImage(uploader.files[0], function (result) {
				$scope.coverImageData = result;
			});
		};

		function handleUploadImage(file, callback) {
			var reader = new FileReader();

			reader.onload = function () {
				callback(reader.result);
			};

			reader.readAsDataURL(file);
		}
	});
}());