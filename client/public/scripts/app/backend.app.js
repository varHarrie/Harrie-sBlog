(function() {
	'use strict';

	angular.module('backendApp', [
		'ngRoute',
		'ngAnimate',
		'backend.controllers',
		'harrie.mdeditor',
		'directives'
	])
	.config(function($routeProvider){
		$routeProvider
			.when('/post',{
				templateUrl:'./partials/_post',
				controller:'postCtrl'
			})
			.when('/article',{
				templateUrl:'./partials/_article',
				controller:'articleCtrl'
			})
			.when('/article/:id',{
				templateUrl:'./partials/_article_view',
				controller:'articleViewCtrl'
			})
			.when('/articleEdit/:id',{
				templateUrl:'./partials/_article_edit',
				controller:'articleEditCtrl'
			})
			.when('/category',{
				templateUrl:'./partials/_category',
				controller:'categoryCtrl'
			})
			.when('/tag',{
				templateUrl:'./partials/_tag',
				controller:'tagCtrl'
			})
			.when('/stats',{
				templateUrl:'./partials/_stats',
				controller:'statsCtrl'
			})
			.otherwise({
				redirectTo:'/post'
			})
	});
})();