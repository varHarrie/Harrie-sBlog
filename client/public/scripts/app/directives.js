(function () {
	'use strict';

	angular.module('directives', [

	])
		.directive('pagination', [function () {
			var defaultClasses = {
				wrapper: 'pagination',
				item: 'item',
				left: 'fa fa-chevron-left',
				right: 'fa fa-chevron-right',
			}
			return {
				scope: {
					page: '=',
					total: '=',
					classes: '=',
					action: '='
				},
				template: [
					'<ul class="pagination">',
						'<li ng-click="page<=1||onclick(page-1)" ng-disabled="page<=1" class="{{classes.item}}"><i class="{{classes.left}}"></i></li>',
						//'<li ng-if="page>3" class="{{classes.item}}" ng-disabled="true">...</li>',
						'<li ng-repeat="p in pages" ng-click="onclick(p)" class="{{classes.item}}" ng-class="{active:p==page}" ng-bind="p"></li>',
						//'<li ng-if="page<total-1" class="{{classes.item}}" ng-disabled="true">...</li>',
						'<li ng-click="page>=total||onclick(page+1)" ng-disabled="page>=total" class="{{classes.item}}"><i class="{{classes.right}}"></i></li>',
					'</ul>'
				].join(''),
				link: function ($scope, elm, attr) {
					$scope.replace = '{page}';
					$scope.classes = $scope.classes || defaultClasses;
					$scope.$watch('page', function () {
						$scope.pages = [];
						var page = $scope.page;
						var total = $scope.total;
						var start = 1;
						var end = total;
						if(total>5){
							start = page - 2 > 0 ? page - 2 : 1;
							end = start + 4 < total ? start + 4 : total;
						}
						for (var i = start; i <= end; i++) {
							$scope.pages.push(i);
						}
					});
					$scope.onclick = function (page) {
						if ($scope.action && typeof $scope.action === 'function')
							$scope.action(page);
					};
				}
			}
		}])
	;
})();