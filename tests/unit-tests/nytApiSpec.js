//NYT API call test

describe('nytApiTest', function(){
	beforeEach(module('timesSearchApp'));

	inject(function(_$rootScope_, _$injector_, $templateCache){
		$rootScope = $_rootScope_;
		$injector = $_injector_;
		$templateCache.put('./partials/search.html', '<./partials/search.html>');
	});

	it('should query the NYT API for article data',
		inject(function(articleFactory, $httpBackend, $rootScope, $q){
			$httpBackend.expect('JSON', 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=politics&begin_date=20160501&end_date=20160503&sort=newest&api-key=da049a2ebfeed654a53bd38ab6573867:9:60954891')
			.respond({
				nytApiTest: [{key:0}, {key:1}]
			});

			$httpBackend.expect('GET', './partials/search.html').respond(200);

			var articles
			
			var q = 'politics'; 
			var begin_date = '&begin_date=20160501';
			var end_date = '&end_date=20160502';
			var sortChoice = '&sort=newest';
			var key = '&api-key=da049a2ebfeed654a53bd38ab6573867:9:60954891';

			$q.when(articleFactory.getArticles(q, begin_date, end_date, sortChoice, key)).then(function(result){
				articles = result.nytApiTest
			});

			$rootScope.$digest();
			$httpBackend.flush();
			expect(articles.length).toBe(2);
			$httpBackend.verifyNoOutstandingRequest();
	}));
});