(function () {
	"use strict";

	angular.module("app.factories").factory("UtilsFactory", function ($route) {
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