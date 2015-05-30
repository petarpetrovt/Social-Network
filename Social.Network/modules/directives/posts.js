(function () {
	"use strict";

	angular.module("app.directives").directive('posts', function () {
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				posts: '=',
			},
			templateUrl: 'views/directives/posts.html',
			controller: function ($scope, PostsFactory, CommentsFactory) {
				$scope.toggle = function (id) {
					cleanComments(id);
				};

				$scope.comment = '';
				$scope.postContent = '';
				$scope.commentEdit = '';

				$scope.postComment = function (id) {
					if ($scope.comment) {
						CommentsFactory.create($scope.comment, id, function (data) {
							var index = $scope.posts.map(function (x) { return x.id; }).indexOf(id);
							$scope.posts[index].comments.push(data);
						}, function (data) {
							console.log(data);
						});

						cleanComments(id);
					}
				};

				$scope.likePost = function (id) {
					PostsFactory.like(id, function (data) {
						likePost(id);
					}, function (data) {
						console.log(data);
					});
				};

				$scope.unlikePost = function (id) {
					PostsFactory.deleteLikes(id, function (data) {
						unlikePost(id);
					}, function (data) {
						console.log(data);
					});
				};

				$scope.likeComment = function (postId, id) {
					CommentsFactory.likePostComment(postId, id, function (data) {
						likePostComment(postId, id);
					}, function (data) {
						console.log(data);
					});
				};

				$scope.unlikeComment = function (postId, id) {
					CommentsFactory.deletePostCommentLike(postId, id, function (data) {
						unlikePostComment(postId, id);
					}, function (data) {
						console.log(data);
					});
				};

				$scope.deleteComment = function (postId, id) {
					if (confirm("Are you sure you want to delete this comment?")) {
						CommentsFactory.delete(id, postId, function (data) {
							removePostComment(postId, id);
						}, function (data) {
							console.log(data);
						});
					}
				};

				$scope.deletePost = function (id) {
					if (confirm("Are you sure you want to delete this post?")) {
						PostsFactory.delete(id, function (data) {
							removePost(id);
						}, function (data) {
							console.log(data);
						});
					}
				};

				$scope.editPost = function (id) {
					cleanPosts(id);

					PostsFactory.get(id, function (data) {
						$scope.postContent = data.postContent;
					}, function (data) {
						console.log(data);
					});
				};

				$scope.updatePost = function (id) {
					if ($scope.postContent) {
						PostsFactory.update(id, $scope.postContent, function (data) {
							updatePost(id, $scope.postContent);
							cleanPosts(id);
						}, function (data) {
							console.log(data);
						});
					}
				};

				$scope.editComment = function (postId, commentId) {
					cleanEditComments(postId, commentId);

					CommentsFactory.getPostComments(postId, function (data) {
						var index = data.map(function (x) { return x.id; }).indexOf(commentId);
						$scope.commentEdit = data[index].commentContent;
					}, function (data) {
						console.log(data);
					});
				};

				$scope.updateComment = function (postId, commentId) {
					if ($scope.commentEdit) {
						CommentsFactory.update(commentId, postId, $scope.commentEdit, function (data) {
							updateComment(postId, commentId, data.commentContent);
							cleanEditComments(postId, commentId);
						}, function (data) {
							console.log(data);
						});
					}
				};

				$scope.showAll = function (postId) {
					CommentsFactory.getPostComments(postId, function (data) {
						var index = getPostIndex(postId);
						$scope.posts[index].comments = data;
					}, function (data) {
						console.log(data);
					});
				};

				function likePost(id) {
					var index = getPostIndex(id);
					$scope.posts[index].liked = true;
					$scope.posts[index].likesCount += 1;
				}

				function unlikePost(id) {
					var index = getPostIndex(id);
					$scope.posts[index].liked = false;
					$scope.posts[index].likesCount -= 1;
				}

				function likePostComment(postId, id) {
					var postIndex = getPostIndex(postId);
					var index = getPostCommentIndex(postIndex, id);
					$scope.posts[postIndex].comments[index].liked = true;
					$scope.posts[postIndex].comments[index].likesCount += 1;
				}

				function unlikePostComment(postId, id) {
					var postIndex = getPostIndex(postId);
					var index = getPostCommentIndex(postIndex, id);
					$scope.posts[postIndex].comments[index].liked = false;
					$scope.posts[postIndex].comments[index].likesCount -= 1;
				}

				function removePost(postId) {
					var index = getPostIndex(postId);
					$scope.posts.splice(index, 1);
				}

				function removePostComment(postId, id) {
					var postIndex = getPostIndex(postId);
					var index = getPostCommentIndex(postIndex, id);
					$scope.posts[postIndex].comments.splice(index, 1);
				}

				function getPostIndex(id) {
					return $scope.posts.map(function (x) { return x.id; }).indexOf(id);
				}

				function getPostCommentIndex(postIndex, id) {
					return $scope.posts[postIndex].comments.map(function (x) { return x.id; }).indexOf(id);
				}

				function updatePost(id, content) {
					var index = getPostIndex(id);
					$scope.posts[index].postContent = content;
				}

				function updateComment(postId, commentId, content) {
					var postIndex = getPostIndex(postId);
					var index = getPostCommentIndex(postIndex, commentId);
					$scope.posts[postIndex].comments[index].commentContent = content;
				}

				function cleanComments(postId) {
					$scope.posts.forEach(function (element, index, array) {
						if (element.id === postId)
							$('#comment_' + element.id).toggle();
						else
							$('#comment_' + element.id).hide();
					});

					$scope.comment = '';
				}

				function cleanEditComments(postId, commentId) {
					$scope.posts.forEach(function (element, index, array) {
						if (element.id === postId)
							$('#commentEdit_' + element.id + '_' + commentId).toggle();
						else
							$('#commentEdit_' + element.id + '_' + commentId).hide();
					});

					$scope.commentEdit = '';
				}

				function cleanPosts(postId) {
					$scope.posts.forEach(function (element, index, array) {
						if (element.id === postId)
							$('#post_' + element.id).toggle();
						else
							$('#post_' + element.id).hide();
					});

					$scope.postContent = '';
				}
			}
		}
	});
}());