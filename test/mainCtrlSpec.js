// /* global sinon */

// describe('marvelApp', function() {
//   'use strict';
//   beforeEach(module('marvelApp'));
//   describe('controllers', function() {
//     describe('Main Controller', function() {
//       var scope;
//       beforeEach(inject(function($controller, $rootScope, $q) {
//         scope = $rootScope.$new();
//         var mockSuperheroService = {
//           getSuperheroes: function() {
//             var deferred = $q.defer();
//             deferred.resolve(100);
//             return deferred.promise;
//           }
//         };
//         $controller('MainCtrl', { $scope: scope, superheroService: mockSuperheroService });
//       }));

//       it('isSelected should be false on initialize', function() {
//         expect(scope.isSelected).toBe(false);
//       });

//       it('isSelected should be true when scope.selectHero run', function() {
//         var hero = {
//           name: 'Jason Hamm',
//           thumbnail: {
//             path: 'blah',
//             extension: 'jpg'
//           }
//         };
//         var index = 2;
//         scope.selectHero(hero, index);
//         expect(scope.isSelected).toBe(true);
//       });

//       it('should assign result of getHeroes to scope.heroes', function() {
//         scope.$apply();
//         expect(scope.heroes).toBe(100);
//       });
//     });
//   });

//   describe('services', function() {
//     describe('superheroService', function() {
//       var service;
//       beforeEach(function() {
//         module(function($provide) {
//           var mockKeys = sinon.stub({
//             apikey: 'test'
//           });
//           $provide.constant('keys', mockKeys);
//         });
//       });

//       beforeEach(inject(function(superheroService) {
//         service = superheroService;
//       }));
//       it('offset should be initialized at 0', function() {
//         expect(service.offset).toBe(0);
//       });

//       it('should call http://gateway.marvel.com/v1/public/characters with getResource().get()', inject(function($httpBackend) {
//         $httpBackend.when('GET', 'http://gateway.marvel.com/v1/public/characters').respond({ result: 'stuff' });
//         var value = service.getResource().get();
//         $httpBackend.flush();
//         expect(value.result).toBe('stuff');
//       }));

//       it('should assign result of getSuperheroes() to superheroes array', inject(function($httpBackend) {
//         expect(service.superheroes).toBeNull();
//         $httpBackend.when('GET', 'http://gateway.marvel.com/v1/public/characters?apikey=test').respond({
//           data: {
//             results: 100
//           }
//         });
//         service.getSuperheroes();
//         $httpBackend.flush();
//         expect(service.superheroes).toBe(100);
//       }));
//     });
//   });

//   describe('filters', function() {
//     describe('desription filter', function() {
//       it('should be `No Description Available` if the description is empty', inject(function(descriptionFilter) {
//         var description = '';
//         expect(descriptionFilter(description)).toBe('No Description Available');
//       }));

//       it('should be the description if the description is not empty', inject(function(descriptionFilter) {
//         var description = 'test test';
//         expect(descriptionFilter(description)).toBe('test test');
//       }));
//     });
//   });

//   describe('directives', function() {
//     describe('detail window directive', function() {
//       var directive, scope;
//       beforeEach(module('views/detail.window.directive.html'));
//       beforeEach(module('views/detail.window.footer.directive.html'));
//       beforeEach(inject(function($compile, $rootScope) {
//         scope = $rootScope;
//         directive = angular.element('<div detail-window></div>');
//         $compile(directive)(scope);
//       }));

//       it('should show `None Selected` when isSelected is false', function() {
//         scope.isSelected = false;
//         scope.$digest();
//         expect(directive.text()).toContain('None Selected');
//       });

//       it('should show hero name when isSelected is true', function() {
//         scope.isSelected = true;
//         scope.heroName = 'Jason Hamm';
//         scope.$digest();
//         expect(directive.text()).toContain('Jason Hamm');
//       });

//       xit('should have hello world after test() is run', function() {
//         scope.$digest();
//         expect(scope.hello).toBeUndefined();
//         scope.test();
//         expect(scope.hello).toBe('Hello World');
//       });
//     });
//   });
// });