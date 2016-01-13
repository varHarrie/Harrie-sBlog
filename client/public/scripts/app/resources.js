(function () {
	'use strict';
	/*
		get:{method:'GET'},
		query:{method:'GET',isArray:true},
		save:{method:'POST'},
		delete:{method:'DELETE'},
		remove:{method:'DELETE'}
	*/
	angular.module('resources', [
		'ngResource'
	])
		.factory('Category', ['$resource', function ($resource) {
			return $resource('/api/category/:_id', null, {
				update: { method: 'PUT' }
			});
		}])
		.factory('Article', ['$resource', function ($resource) {
			return $resource('/api/article/:_id', null, {
				update: { method: 'PUT' },
				query: { method: 'GET', isArray: false }
			});
		}]);
})();