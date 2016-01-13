(function () {
    'use strict';

    angular.module('blogApp', [
            'ui.router',
            'ngAnimate',
            'blog.controllers',
            'harrie.mdeditor',
            'directives'
        ])
        .run(['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }])
        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('c/all/p/1');
                $stateProvider
                //blog state
                    .state('blog', {
                        abstract: true,
                        url: '/',
                        templateUrl: './partials/blog',
                        controller: 'blogCtrl'
                    })
                    .state('blog.category', {
                        url: 'c/{categoryId}/p/{page}',
                        templateUrl: './partials/category',
                        controller: 'categoryCtrl'
                    })
                    .state('blog.article', {
                        url: 'a/{articleId}',
                        templateUrl: './partials/view',
                        controller: 'articleCtrl'
                    })
                    //archives state
                    .state('archives', {
                        url: 'archives',
                        templateUrl: '',
                        controller: ''
                    })
                    //about state
                    .state('about', {
                        url: 'archives',
                        templateUrl: '',
                        controller: ''
                    })
            }]);
})();