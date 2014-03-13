angular.module('marvelApp').directive('detailWindow', function() {
  'use strict';
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'views/detail.window.directive.html',
    link: function(scope) {
      scope.test = 'World';
    }
  };
});