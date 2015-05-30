(function () {
	"use strict";

	angular.module("app.factories").factory("PostsFactory", function ($http, UtilsFactory, baseServiceUrl) {
		var service = {};
		var serviceUrl = baseServiceUrl;

		service.create = function (username, content, success, error) {
			$http.post(serviceUrl + '/Posts', {
				PostContent: content,
				Username: username,
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

		service.delete = function (id, success, error) {
			$http.delete(serviceUrl + '/Posts/' + id, {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
		};

		service.like = function (id, success, error) {
			$http.post(serviceUrl + '/Posts/' + id + '/likes', null, {
				headers: UtilsFactory.getHeaders(),
			}).success(success).error(error);
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
}());