/* global sinon */

describe('marvelApp', function() {
  'use strict';
  beforeEach(module('marvelApp'));
  describe('controllers', function() {
    describe('Main Ctrl', function() {
      var scope;
      beforeEach(inject(function($controller, $rootScope, $q) {
        scope = $rootScope.$new();
        var mockSuperheroService = {
          getSuperheroes: function() {
            var deferred = $q.defer();
            deferred.resolve(100);
            return deferred.promise;
          }
        };
        $controller('MainCtrl', { $scope: scope, superheroService: mockSuperheroService } );
      }));

      it('should initialize isSelected to false', function() {
        expect(scope.isSelected).toBe(false);
      });

      it('should change isSelected to true when selectHero is run', function() {
        var hero = {
          name: 'Steve',
          thumbnail: {

          }
        };
        var index = 1;
        scope.selectHero(hero, index);
        expect(scope.isSelected).toBe(true);
      });

      it('should assign data to scope.heroes', function() {
        scope.$apply();
        expect(scope.heroes).toBe(100);
      });
    });
  });

  describe('services', function() {
    var shService, httpBackend;
    beforeEach(function() {
      var mockKeys = sinon.stub({
        apikey: 'test'
      });
      module(function($provide) {
        $provide.constant('keys', mockKeys);
      });
    });
    beforeEach(inject(function(superheroService, $httpBackend) {
      shService = superheroService;
      httpBackend = $httpBackend;
    }));
    describe('superhero service', function() {
      it('should initialize offset to 0', function() {
        expect(shService.offset).toBe(0);
      });

      it('should hit `http://gateway.marvel.com/v1/public/characters when getResource().get()', function() {
        httpBackend.when('GET', 'http://gateway.marvel.com/v1/public/characters').respond({
          result : 'result'
        });
        var value = shService.getResource().get();
        httpBackend.flush();
        expect(value.result).toBe('result');
      });

      it('should assign result of getSuperheroes() to superheroes array', function() {
        httpBackend.when('GET', 'http://gateway.marvel.com/v1/public/characters?apikey=test').respond({
          data : {
            results: 200
          }
        });
        shService.getSuperheroes();
        httpBackend.flush();
        expect(shService.superheroes).toBe(200);
      });
    });
  });

  describe('filters', function() {
    describe('description filter', function() {
      it('should be the description if the description', inject(function(descriptionFilter){
        var description = 'Jason';
        expect(descriptionFilter(description)).toBe('Jason');
      }));
    });
  });

  describe('directives', function() {
    var directive, scope;
    beforeEach(module('views/detail.window.directive.html'));
    beforeEach(module('views/detail.window.footer.directive.html'));
    beforeEach(inject(function($compile, $rootScope) {
      debugger;
      scope = $rootScope;
      directive = angular.element('<div detail-window></div>');
      $compile(directive)(scope);
    }));
    describe('detail window directive', function() {
      it('should have None Selected', function() {
        scope.isSelected = false;
        scope.$digest();
        expect(directive.text()).toContain('None Selected');
      });
      it('should have heroname', function() {
        scope.heroName = 'Steve';
        scope.isSelected = true;
        scope.$digest();
        expect(directive.text()).toContain('Steve');
      });
      it('should have test in the scope', function() {
        scope.$digest();
        expect(scope.test).toBe('World');
      });
    });
  });
});