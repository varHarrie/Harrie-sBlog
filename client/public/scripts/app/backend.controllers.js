(function () {
    'use strict';

    angular.module('backend.controllers', [
            'resources'
        ])
        .controller('mainCtrl', ['$scope', '$rootScope', 'Category', function ($scope, $rootScope, Category) {
            $rootScope.categories = [];
            Category.query({}, function (categories) {
                $scope.categories = categories;
            });
            $rootScope.showMenu = false;
            $rootScope.tabs = [
                {title: '发表博文', url: '#/post'},
                {title: '博文管理', url: '#/article'},
                {title: '分类管理', url: '#/category'},
                {title: '标签管理', url: '#/tag'},
                {title: '站点统计', url: '#/stats'}
            ];
            $scope.toggleMenu = function (a, b, c) {
                $scope.showMenu = !$scope.showMenu;
            }
        }])
        .controller('postCtrl', ['$scope', '$rootScope', 'Article', '$location', function ($scope, $rootScope, Article, $location) {
            $rootScope.curTab = $scope.tabs[0];
            $scope.classNames = {
                wrapper: 'mdeditor',
                toolbar: 'mdeditor-toolbar menu menu-icon',
                toolbarItem: 'mdeditor-toolbar-item item',
                separator: 'mdeditor-toolbar-separator',
                textarea: 'mdeditor-textarea',
                preview: 'mdeditor-preview blog-post'
            };
            $scope.form = {}
            $scope.loading = false;
            $scope.submit = function () {
                $scope.loading = true;
                Article.save($scope.form, function (data) {
                    $scope.loading = false;
                    $location.path('/article/' + data.id);
                });
            }
        }])
        .controller('articleViewCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Article', function ($scope, $rootScope, $routeParams, $location, Article) {
            $rootScope.curTab = $scope.tabs[1];
            var id = $routeParams.id;
            if (!id) $location.path('/');
            Article.get({_id: id}, function (article) {
                $scope.article = article;
            });
        }])
        .controller('categoryCtrl', ['$rootScope','$scope', 'Category',
            function ($rootScope,$scope, Category) {
                $rootScope.curTab = $scope.tabs[2];
                $scope.addForm = {};
                $scope.loading = false;
                $scope.addSubmit = function () {
                    $scope.loading = true;
                    Category.save($scope.addForm, function (data) {
                        $scope.loading = false;
                        $scope.addForm = {};
                        $scope.categories.push(data.category);
                    })
                };
                Category.query({}, function (categories) {
                    $scope.categorie = categories;
                })
            }])
        .controller('articleCtrl', ['$rootScope','$scope', 'Article',
            function ($rootScope,$scope, Article) {
                $rootScope.curTab = $scope.tabs[1];
                $scope.page = 0;
                $scope.pageTotal = 0;
                $scope.articles = [];

                $scope.go = function (page) {
                    Article.query({page: page}, function (data) {
                        $scope.page = page;
                        $scope.pageTotal = data.pageTotal;
                        $scope.articles = data.articles;
                    });
                }
                $scope.go(1);
            }])
    ;
})();