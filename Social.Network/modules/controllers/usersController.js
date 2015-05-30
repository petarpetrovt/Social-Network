(function () {
	"use strict";

	angular.module("app.controllers").controller("UsersController", function ($scope, $location, UtilsFactory, ProfileFactory) {
		ProfileFactory.get(function (data) {
			$scope.email = data.email;
			$scope.name = data.name;
			$scope.gender = data.gender;

			if (data.profileImageData)
				$scope.profileImageData = data.profileImageData;
			else
				$scope.profileImageData = '../../images/avatar.gif';

			if (data.coverImageData)
				$scope.coverImageData = data.coverImageData;
			else
				$scope.default = 'cover-default';
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
				name: $scope.name,
				email: $scope.email,
				gender: $scope.gender,
				profileImageData: $scope.profileImageData,
				coverImageData: $scope.coverImageData,
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
				$scope.profileImageData = result;
			});
		};

		$scope.coverImageUploaded = function (uploader) {
			handleUploadImage(uploader.files[0], function (result) {
				$scope.coverImageData = result;
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