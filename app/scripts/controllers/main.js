'use strict';

angular.module('marvelApp')
.controller('MainCtrl', function ($scope, superheroService) {

  $scope.getHeroes = function() {
    superheroService.getSuperheroes().then(function(data) {
      $scope.heroes = data;
    });
  };

  $scope.selectHero = function(hero, index) {
    $scope.isSelected = true;
    $scope.heroName = hero.name;
    $scope.imageUrl = hero.thumbnail.path;
    $scope.imageExtension = hero.thumbnail.extension;
    $scope.selectedIndex = index;
  };

  $scope.getHeroes();

  $scope.isSelected = false;
});