(function () {
	"use strict";

	angular.module("app.factories").factory("UtilsFactory", function ($route) {
		var service = {};

		service.setCredentials = function (serverData) {
			sessionStorage['sessionToken'] = serverData.access_token;
			sessionStorage['username'] = serverData.userName;
			
			var now = Date.now();
			now += serverData.expires_in;

			sessionStorage['expires'] = new Date(now);
		};

		service.clearCredentials = function () {
			sessionStorage.clear();
		};

		service.getHeaders = function () {
			return {
				Authorization: "Bearer " + sessionStorage['sessionToken']
			};
		};

		service.isLogged = function () {
			var session = sessionStorage['sessionToken'];
			var expires = sessionStorage['expires'];
			var isExpired = Date.now() < expires;

			return !!session && !isExpired;
		};

		service.refresh = function () {
			$route.reload();
		};

		service.isMe = function (username) {
			return sessionStorage['username'] === username;
		};

		return service;
	});
}());