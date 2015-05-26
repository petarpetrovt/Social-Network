(function () {
	"use strict";

	var app = angular.module("app.services", []);

	app.factory("PostsFactory", function ($http, UtilsFactory, baseServiceUrl) {
		var service = {};
		var serviceUrl = baseServiceUrl;

		service.create = function (content, success, error) {
			$http.post(serviceUrl + '/Posts', {
				PostContent: content,
				Username: UtilsFactory.getUsername(),
			}, {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.get = function (id, success, error) {
			$http.get(serviceUrl + '/Posts/' + id, {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.update = function (id, content, success, error) {
			$http.put(serviceUrl + '/Posts/' + id, {
				PostContent: content,
			}, {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.delete = function () {
			$http.delete(serviceUrl + '/Posts/' + id, {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.like = function (id, success, error) {
			$http.post(serviceUrl + '/Posts/' + id + '/likes', {
				headers: UtilsFactory.getHeaders(),
			}).success(function (data, status, headers, config) {
				success(data);
			}).error(function (data) {
				error(data);
			});
		};

		service.getLikesPreview = function (id, success, error) {
			$http.get(serviceUrl + '/Posts/' + id + '/likes/preview', {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.getLikes = function (id, success, error) {
			$http.get(serviceUrl + '/Posts/' + id + '/likes', {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.deleteLikes = function (id, success, error) {
			$http.delete(serviceUrl + '/Posts/' + id + '/likes', {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		return service;
	});

	app.factory("ProfileFactory", function ($http, UtilsFactory, baseServiceUrl) {
		var service = {};
		var serviceUrl = baseServiceUrl;

		service.get = function (success, error) {
			$http.get(serviceUrl + '/me', {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		}

		service.update = function (data, success, error) {
			$http.put(serviceUrl + '/me', data, {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		};

		service.changePassword = function (oldPass, newPass, ConPass, success, error) {
			$http.put(serviceUrl + '/me/changepassword', {
				OldPassword: oldPass,
				NewPassword: newPass,
				ConfirmPassword: ConPass,
			}, {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		}

		service.getFriends = function (success, error) {
			$http.get(serviceUrl + '/me/friends', {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		};

		service.getFriendsPreview = function (success, error) {
			$http.get(serviceUrl + '/me/friends/preview', {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		};

		service.getNewsFeed = function (start, count, success, error) {
			var url = serviceUrl + '/me/feed?PageSize=' + count;

			if (start) {
				url += '&StartPostId=' + startPostId;
			}

			$http.get(url, {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		};

		service.getFriendRequests = function (success, error) {
			$http.get(serviceUrl + '/me/requests', {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		};

		service.sendFriendRequest = function (username, success, error) {
			$http.post(serviceUrl + '/me/requests/' + username, null, {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		};

		service.acceptFriendRequest = function (id, success, error) {
			$http.put(serviceUrl + '/me/requests/' + id + '?status=approved', null, {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		}

		service.rejectFriendRequest = function (id, success, error) {
			$http.put(serviceUrl + '/me/requests/' + id + '?status=delete', null, {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		}

		return service;
	});

	app.factory("UsersFactory", function ($http, UtilsFactory, baseServiceUrl) {
		var service = {};
		var serviceUrl = baseServiceUrl;

		service.login = function (username, password, success, error) {
			$http.post(serviceUrl + '/users/Login', {
				Username: username, Password: password
			}).success(success).error(error);
		};

		service.logout = function (success, error) {
			$http.post(serviceUrl + '/users/Logout', null, {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		};

		service.register = function (registerData, success, error) {
			$http.post(serviceUrl + '/users/register', registerData).success(success).error(error);
		};

		service.preview = function (username, success, error) {
			$http.get(serviceUrl + '/users/' + username + '/preview', {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.search = function (keyword, success, error) {
			$http.get(serviceUrl + '/users/search?searchTerm=' + keyword, {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.get = function (username, success, error) {
			$http.get(serviceUrl + '/users/' + username, {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.getUserPosts = function (username, start, count, success, error) {
			var url = serviceUrl + '/users/' + username + '/wall?PageSize=' + count;

			if (start) {
				url += '&StartPostId=' + start;
			}

			$http.get(url, {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.getUserFrindsPreview = function (username, success, error) {
			$http.get(serviceUrl + '/users/' + username + 'friends/preview', {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.getUserFrinds = function (username, success, error) {
			$http.get(serviceUrl + '/users/' + username + 'friends', {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		return service;
	});

	app.factory("CommentsFactory", function ($http, UtilsFactory, baseServiceUrl) {
		var service = {};
		var serviceUrl = baseServiceUrl;

		service.create = function (content, postId, success, error) {
			$http.post(serviceUrl + '/posts/' + postId + '/comments', {
				CommentContent: content,
			}, {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		};

		service.update = function (commentId, postId, content, success, error) {
			$http.put(serviceUrl + '/posts/' + postId + '/comments/' + commentId, {
				CommentContent: content,
			}, {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.delete = function (commentId, postId, success, error) {
			$http.delete(serviceUrl + '/posts/' + postId + '/comments/' + commentId, {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.getPostComments = function (postId, success, error) {
			$http.get(serviceUrl + '/posts/' + postId + '/comments', {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.getPostCommentLikes = function (postId, commentId, success, error) {
			$http.get(serviceUrl + '/posts/' + postId + '/comments/' + commentId + '/likes', {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.getPostCommentLikesPreview = function (postId, commentId, success, error) {
			$http.get(serviceUrl + '/posts/' + postId + '/comments/' + commentId + '/likes/preview', {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.likePostComment = function (postId, commentId, success, error) {
			$http.post(serviceUrl + '/posts/' + postId + '/comments/' + commentId + '/likes', null, {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		};

		service.deletePostCommentLike = function (postId, commentId, success, error) {
			$http.delete(serviceUrl + '/posts/' + postId + '/comments/' + commentId + '/likes', {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		return service;
	});

	app.factory("UtilsFactory", function ($route) {
		var service = {};

		service.setCredentials = function (serverData) {
			localStorage['sessionToken'] = serverData.access_token;
			localStorage['username'] = serverData.userName;

			var now = Date.now();
			now += serverData.expires_in;

			localStorage['expires'] = new Date(now);
		};

		service.clearCredentials = function () {
			localStorage.clear();
		};

		service.setProfileImage = function (profileImage) {
			localStorage['profileImage'] = profileImage;
		}

		service.getProfileImage = function () {
			return localStorage['profileImage'];
		}

		service.getUsername = function () {
			return localStorage['username'];
		};

		service.getHeaders = function () {
			return {
				Authorization: "Bearer " + localStorage['sessionToken']
			};
		};

		service.isLogged = function () {
			var session = localStorage['sessionToken'];
			var expires = localStorage['expires'];
			var isExpired = Date.now() < expires;

			return !!session && !isExpired;
		};

		service.refresh = function () {
			$route.reload();
		};

		service.isMe = function (username) {
			return localStorage['username'] === username;
		};

		return service;
	});
}());