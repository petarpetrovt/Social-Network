(function () {
	"use strict";

	angular.module("app.controllers").controller("HomeController", function ($scope, UsersFactory, ProfileFactory, PostsFactory, UtilsFactory) {
		$scope.filterFriends = {
			value: '',
			friends: [],
			items: [],
			clear: function () {
				this.value = '';
				this.items = this.friends;
			},
			search: function ($event) {
				var value = $scope.filterFriends.value;
				this.items = [];
				for (var i = 0; i < this.friends.length; i++) {
					var element = this.friends[i];
					if (element.name.toLowerCase().indexOf(value.toLowerCase()) > -1
						|| element.username.toLowerCase().indexOf(value.toLowerCase()) > -1)
						this.items.push(element);
				}
			},
		};

		$scope.filterFriendsRequests = {
			value: '',
			requests: [],
			items: [],
			clear: function () {
				this.value = '';
				this.items = this.requests;
			},
			search: function () {
				var value = $scope.filterFriendsRequests.value;
				this.items = [];
				for (var i = 0; i < this.requests.length; i++) {
					var element = this.requests[i];
					if (element.user.name.toLowerCase().indexOf(value.toLowerCase()) > -1
						|| element.user.username.toLowerCase().indexOf(value.toLowerCase()) > -1)
						this.items.push(element);
				}
			},
		};

		$scope.friendsPreview = [];

		if (UtilsFactory.isLogged()) {
			$scope.main = 'views/feed.html';
			$scope.showTitle = true;
			$scope.isWall = false;
			$scope.lastLoadedId = null;

			$scope.loadMoreFeed = function () {
				loadNewsFeed();
			};

			loadNewsFeed();

			function loadNewsFeed() {
				if ($scope.lastLoadedId === null) {
					ProfileFactory.getNewsFeed(null, 10, function (data) {
						if (data.length <= 0) {
							$scope.lastLoadedId = -1;
							return;
						}

						$scope.feed = data;
						$scope.lastLoadedId = data[data.length - 1].id;
					}, function (data) {
						console.log(data);
					});
				}
				else if ($scope.lastLoadedId < 0) {
					return;
				}
				else {
					ProfileFactory.getNewsFeed($scope.lastLoadedId, 10, function (data) {
						if (data.length <= 0) {
							$scope.lastLoadedId = -1;
							return;
						}

						for (var i = 0; i < data.length; i++) {
							$scope.feed.push(data[i]);
						}

						$scope.lastLoadedId = data[data.length - 1].id;
					}, function (data) {
						console.log(data);
					});
				}
			}

			ProfileFactory.getFriendsPreview(function (data) {
				$scope.friendsPreview = data;
			}, function (data) {
				console.log(data);
			});

			ProfileFactory.getFriends(function (data) {
				$scope.filterFriends.items = data;
				$scope.filterFriends.friends = data;
			}, function (data) {
				console.log(data);
			});

			ProfileFactory.getFriendRequests(function (data) {
				$scope.filterFriendsRequests.items = data;
				$scope.filterFriendsRequests.requests = data;
			}, function (data) {
				console.log(data);
			});

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
}());