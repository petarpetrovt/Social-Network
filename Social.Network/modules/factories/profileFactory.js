(function () {
	"use strict";

	angular.module("app.factories").factory("ProfileFactory", function ($http, UtilsFactory, baseServiceUrl) {
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

		service.removeFriend = function (username, success, error) {
			$http.delete(serviceUrl + '/me/friends/' + username, {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		}

		service.getFriendsPreview = function (success, error) {
			$http.get(serviceUrl + '/me/friends/preview', {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		};

		service.getNewsFeed = function (startPostId, count, success, error) {
			var url = serviceUrl + '/me/feed?PageSize=' + count;

			if (startPostId) {
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
			$http.put(serviceUrl + '/me/requests/' + id + '?status=rejected', null, {
				headers: UtilsFactory.getHeaders()
			}).success(success).error(error);
		}

		return service;
	});
}());