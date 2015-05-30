(function () {
	"use strict";

	angular.module("app.factories").factory("CommentsFactory", function ($http, UtilsFactory, baseServiceUrl) {
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
}());