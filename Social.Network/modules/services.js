(function () {
	"use strict";

	var app = angular.module("app.services", []);

	app.factory("AuthenticationFactory", function ($http, baseServiceUrl) {
		var service = {};

		var serviceUrl = baseServiceUrl;

		service.login = function (username, password, success, error) {
			$http.post(serviceUrl + '/users/Login', { Username: username, Password: password })
				.success(success)
				.error(error);
		};

		service.logout = function (success, error) {
			var base = this.getBase('POST', serviceUrl + '/users/Logout');

			$http(base).success(success).error(error);
		};

		service.register = function (registerData, success, error) {
			$http.post(serviceUrl + '/users/register', registerData)
				.success(success)
				.error(error);
		};

		service.editProfile = function (editData, success, error) {
			$http.put(serviceUrl + '/me', editData, { headers: this.getHeaders() })
				.success(function (data, status, headers, config) {
					success(data);
				}).error(function (data) {
					error(data);
				});
		}

		service.changePassword = function (data, success, error) {
			$http.put(serviceUrl + '/me/changepassword', data, { headers: this.getHeaders() })
				.success(function (data, status, headers, config) {
					success(data);
				}).error(function (data) {
					error(data);
				});
		}

		service.getDataAboutMe = function (success, error) {
			$http.get(serviceUrl + '/me', { headers: this.getHeaders() })
				.success(function (data, status, headers, config) {
					success(data);
				}).error(function (data) {
					error(data);
				});
		}

		service.setCredentials = function (serverData) {
			localStorage['sessionToken'] = serverData.access_token;
			localStorage['username'] = serverData.userName;
		};

		service.setProfileImage = function (profileImage) {
			localStorage['profileImage'] = profileImage;
		}

		service.getUsername = function () {
			return localStorage['username'];
		};

		service.clearCredentials = function () {
			localStorage.clear();
		};

		service.getBase = function (method, url) {
			var header = this.getHeader();

			return {
				method: method,
				url: url,
				headers: {
					Authorization: header,
				}
			};
		};

		service.getHeader = function () {
			return "Bearer " + localStorage['sessionToken'];
		};

		service.isLogged = function () {
			return !!localStorage['sessionToken'];
		};

		return service;
	});

	app.factory("FriendsFactory", function ($http, baseServiceUrl) {
		var service = {};

		var serviceUrl = baseServiceUrl;

		service.getFriendRequests = function (success, error) {
			$http.get(serviceUrl + '/me/requests', { headers: this.getHeaders() })
				.success(function (data, status, headers, config) {
					success(data);
				}).error(function (data) {
					error(data);
				});
		}

		service.sendFriendRequest = function (username, success, error) {
			$http.post(serviceUrl + '/me/requests/' + username, { headers: this.getHeaders() })
				.success(function (data, status, headers, config) {
					success(data);
				}).error(function (data) {
					error(data);
				});
		}

		service.acceptFriendRequest = function (id, success, error) {
			$http.put(serviceUrl + '/me/requests/' + id + '?status=approved', {}, { headers: this.getHeaders() })
				.success(function (data, status, headers, config) {
					success(data);
				}).error(function (data) {
					error(data);
				});
		}

		service.rejectFriendRequest = function (id, success, error) {
			$http.put(serviceUrl + '/me/requests/' + id + '?status=delete', {}, { headers: this.getHeaders() })
				.success(function (data, status, headers, config) {
					success(data);
				}).error(function (data) {
					error(data);
				});
		}

		service.getHeaders = function () {
			return {
				Authorization: "Bearer " + localStorage['sessionToken']
			};
		};

		return service;
	});
}());