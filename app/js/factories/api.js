//factory function for calls to NYT API//

/*var svc_search_v2_articlesearch = function(results){
		console.log(results);
		return results;
	};*/

angular.module('ArticleServices', [])

	.constant('key', '&api-key=da049a2ebfeed654a53bd38ab6573867:9:60954891')
	.constant('baseUrl', '//api.nytimes.com/svc/search/v2/articlesearch')
	//.constant('callback', '&callback=svc_search_v2_articlesearch') //NYT API-specific requirement

	.factory('articleFactory', ['$http', 'key', 'baseUrl', '$route', '$q', function($http, key, baseUrl, $route, $q){

			function getArticles(query, fromDate, toDate, fromDateforApi, toDateforApi, sortChoice){
				query = query || {};
				var responseFormat = '.json?';
				var q = 'q=' + query; //NYT API-specific requirement
				var begin_date = '&begin_date=' + fromDateforApi;
				var end_date = '&end_date=' + toDateforApi;
				var sort = '&sort=' + sortChoice;
				return $http.get(baseUrl + responseFormat + q + begin_date + end_date + sort + key).then(function(results){
					//JSON.parse(results);
					console.log(results);
					return results.data.response;
				});
			}
			return {getArticles: getArticles};	
	}]);