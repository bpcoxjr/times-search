//unit test for all controllers of Angular module timesSearchApp 

describe('timesSearchApp', function(){
	beforeEach(module('timesSearchApp'));

	//unit test for the search controller
	describe('SearchController', function(){

		var ctrl, scope;

		beforeEach(inject(function($controller, $rootScope){
			scope = $rootScope.$new();
			ctrl = $controller('SearchController', {
				$scope : scope
			});
		}));

		it('should submit the form date input by user to NYT server', function(){
			scope.submit({
				query: 'politics',
				begin_date: '20160101',
				end_date: '20160501',
				sort: 'newest'
			});
		});
	});

	//unit test for the results controller
	describe('ResultsController', function(){

		var ctrl, scope;

		beforeEach(inject(function($controller, $rootScope){
			scope = $rootScope.$new();
			ctrl = $controller('ResultsController', {
				$scope : scope
			});
		}));

		it('Should return results of api call and load more upon infinite sroll function call', function(){
			getArticles: function(){ return true; },
			loadMoreResults: function() {return true; }
		});
	});

});
