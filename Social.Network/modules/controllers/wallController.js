(function () {
	"use strict";

	angular.module("app.controllers").controller("WallController", function ($scope, $location, $routeParams, PostsFactory,
		ProfileFactory, UsersFactory, UtilsFactory) {

		var username = $routeParams.username;
		if (!username) {
			$location.path('/');
		}

		$scope.username = username;
		$scope.textModel = "";
		$scope.showTitle = false;
		$scope.isMe = UtilsFactory.isMe(username);
		$scope.isWall = true;
		$scope.lastLoadedId = null;

		loadPosts();

		UsersFactory.get(username, function (data) {
			$scope.profile = data;
			loadFriends();
		}, function (data) {
			console.log(data);
		});

		$scope.post = function (text) {
			if (text) {
				PostsFactory.create(username, text, function (data) {
					$scope.userPosts.unshift(data);
				}, function (data) {
					console.log(data);
				});
				$scope.textModel = "";
			}
		};

		$scope.request = function () {
			ProfileFactory.sendFriendRequest(username, function (data) {
				$.notify('You have successfully sended friend request to ' + username + '.', 'success');
				UtilsFactory.refresh();
			}, function (data) {
				console.log(data);
			});
		};

		function loadFriends() {
			if ($scope.isMe) {
				ProfileFactory.getFriendsPreview(function (data) {
					$scope.friendsPreview = data;
				}, function (data) {
					console.log(data);
				});
			} else if ($scope.profile.isFriend) {
				UsersFactory.getUserFriendsPreview(username, function (data) {
					$scope.friendsPreview = data;
				}, function (data) {
					console.log(data);
				});
			}
		}

		$scope.loadMorePosts = function () {
			loadPosts();
		};

		function loadPosts() {
			if ($scope.lastLoadedId === null) {
				UsersFactory.getUserPosts(username, null, 10, function (data) {
					if (data.length <= 0) {
						$scope.lastLoadedId = -1;
						return;
					}
					$scope.userPosts = data;
					$scope.lastLoadedId = data[data.length - 1].id;
				}, function (data) {
					console.log(data);
				});
			}
			else if ($scope.lastLoadedId < 0) {
				return;
			}
			else {
				UsersFactory.getUserPosts(username, $scope.lastLoadedId, 10, function (data) {
					if (data.length <= 0) {
						$scope.lastLoadedId = -1;
						return;
					}

					for (var i = 0; i < data.length; i++) {
						$scope.userPosts.push(data[i]);
					}

					$scope.lastLoadedId = data[data.length - 1].id;
				}, function (data) {
					console.log(data);
				});
			}
		}
	});
}());