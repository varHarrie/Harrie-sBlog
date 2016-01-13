(function () {
    'use strict';

    angular.module('blog.controllers', [
            'resources'
        ])
        .controller('blogCtrl', ['$scope', '$state',
            function ($scope, $state) {
                $scope.page = 0;
                $scope.pageTotal = 0;
                $scope.articles = [];
                $scope.go = function (page) {
                    $state.go('.', {page: page});
                }
            }])
        .controller('categoryCtrl', ['$scope', 'Article', '$stateParams',
            function ($scope, Article, $stateParams) {
                var categoryId = $stateParams.categoryId;
                var page = parseInt($stateParams.page);

                Article.query({
                    categoryId: categoryId,
                    page: page
                }, function (data) {
                    $scope.$parent.page = page;
                    $scope.$parent.articles = data.articles;
                    $scope.$parent.pageTotal = data.pageTotal;
                });
            }])
        .controller('articleCtrl', ['$scope', '$stateParams', '$state', '$location', 'Article',
            function ($scope, $stateParams, $state, $location, Article) {
                var id = $stateParams.articleId;
                $scope.article = null;
                if (!id) $location.path('/');
                Article.get({_id: id}, function (article) {
                    $scope.article = article;
                });
            }]);
})();