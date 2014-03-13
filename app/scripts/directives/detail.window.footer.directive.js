angular.module('marvelApp').directive('detailFooterWindow', function() {
  'use strict';
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'views/detail.window.footer.directive.html'
  };
});