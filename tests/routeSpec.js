//test to check that angular-route works as expected

describe('Routes', function(){
	beforeEach(module('timesSearchApp'));
	
  	//check that search partial loads as expected
	it('should load home/search partial', function(){
		inject(function($route, $rootScope, $location, $httpBackend){
			var route = $route.routes['/home'];
			$httpBackend.whenGET(route.templateUrl).respond('...');

			$rootScope.$apply(function(){
				$location.path(route.originalPath);
			});

			expect($route.current.templateUrl).toBe('./partials/search.html');
		});
	});

	//check that about partial loads as expected
	it('should load about partial', function(){
		inject(function($route, $rootScope, $location, $httpBackend){
			var route = $route.routes['/about'];
			$httpBackend.whenGET(route.templateUrl).respond('...');

			$rootScope.$apply(function(){
				$location.path(route.originalPath);
			});

			expect($route.current.templateUrl).toBe('./partials/about.html');
		});
	});

	//check that results partial loads as expected
	it('should load results partial', function(){
		inject(function($route, $rootScope, $location, $httpBackend){
			var route = $route.routes['/results'];
			$httpBackend.whenGET(route.tempateUrl).respond('...');

			$rootScope.$apply(function(){	
				$location.path(route.originalPath);
			});

			expect($route.current.templateUrl).toBe('./partials/results.html');
		});
	});
});