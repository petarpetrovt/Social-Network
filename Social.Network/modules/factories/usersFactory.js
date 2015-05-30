(function () {
	"use strict";

	angular.module("app.factories").factory("UsersFactory", function ($http, UtilsFactory, baseServiceUrl) {
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

		service.getUserFriendsPreview = function (username, success, error) {
			$http.get(serviceUrl + '/users/' + username + '/friends/preview', {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.getUserFriends = function (username, success, error) {
			$http.get(serviceUrl + '/users/' + username + 'friends', {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		return service;
	});
}());