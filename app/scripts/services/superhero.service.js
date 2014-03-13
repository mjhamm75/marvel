'use strict';

angular.module('marvelApp').factory('superheroService', function($resource, $q, keys) {
  return {
    superheroes: null,
    offset: 0,
    getSuperheroes: function() {
      var deferred = $q.defer();
      var that = this;
      if(this.superheroes) {
        deferred.resolve(that.superheroes);
      } else {
        this.getResource().get({
          apikey: keys.apikey
        }, function(data) {
          that.superheroes = data.data.results;
          deferred.resolve(data.data.results);
        });
      }
      return deferred.promise;
    },
    getResource: function() {
      return $resource('http://gateway.marvel.com/v1/public/characters/:characterId', { characterId: '@characterId'}, {
        limit: 100,
        offset: this.offset
      });
    }
  };
});