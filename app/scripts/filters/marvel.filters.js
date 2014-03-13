angular.module('marvelApp').filter('description', function() {
  'use strict';
  return function(description) {
    if(description === '') {
      return 'No Description Available';
    } else {
      return description;
    }
  };
});