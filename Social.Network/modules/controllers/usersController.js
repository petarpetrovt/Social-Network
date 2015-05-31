(function () {
	"use strict";

	angular.module("app.controllers").controller("UsersController", function ($scope, $location, UtilsFactory, ProfileFactory) {
		$scope.data = {
			name: '',
			email: '',
			gender: '',
			profileImageData: '',
			coverImageData: '',
		};

		ProfileFactory.get(function (data) {
			$scope.data = data;
		}, function (data) {
			console.log(data);
		});

		$scope.oldPassword = '';
		$scope.newPassword = '';
		$scope.conPassword = '';

		$scope.changePassword = function () {
			if (!$scope.oldPassword
				|| !$scope.newPassword
				|| !$scope.conPassword)
				return;

			ProfileFactory.changePassword($scope.oldPassword, $scope.newPassword,
				$scope.conPassword, function (data) {
					$location.path('/');
					UtilsFactory.refresh();
					$.notify('You have successfully changed your password.', 'success');
				}, function (data) {
					console.log(data);
				});
		};

		$scope.edit = function () {
			var data = {
				name: $scope.data.name,
				email: $scope.data.email,
				gender: $scope.data.gender,
				profileImageData: $scope.data.profileImageData,
				coverImageData: $scope.data.coverImageData,
			};

			ProfileFactory.update(data, function (data) {
				$location.path('/');
				UtilsFactory.refresh();
				$.notify('You have successfully edited your profile.', 'success');
			}, function (data) {
				console.log(data);
			});
		};

		$scope.profileImageUploaded = function (uploader) {
			handleUploadImage(uploader.files[0], function (result) {
				$scope.data.profileImageData = result;
			});
		};

		$scope.coverImageUploaded = function (uploader) {
			handleUploadImage(uploader.files[0], function (result) {
				$scope.data.coverImageData = result;
			});
		};

		function handleUploadImage(file, callback) {
			var reader = new FileReader();

			reader.onload = function () {
				callback(reader.result);
			};

			reader.readAsDataURL(file);
		}
	});
}());