//factory function for calls to NYT API//

var svc_search_v2_articlesearch = function(result){
		console.log(result);
	};

angular.module('ArticleServices', [])

	.constant('key', '&api-key=da049a2ebfeed654a53bd38ab6573867:9:60954891')
	.constant('baseUrl', '//api.nytimes.com/svc/search/v2/articlesearch')
	.constant('callback', '&callback=svc_search_v2_articlesearch') //NYT API-specific requirement

	.factory('articleFactory', ['$http', 'key', 'baseUrl', 'callback', '$route', '$q', function($http, key, baseUrl, callback, $route, $q){

			function getArticles(query, fromDate, toDate){
				query = query || {};
				var responseFormat = '.jsonp?';
				var q = 'q=' + query; //NYT API-specific requirement
				var begin_date = '&begin_date=' + fromDate;
				var end_date = '&end_date=' + toDate;
				return $http.jsonp(baseUrl + responseFormat + q + begin_date + end_date + callback + key).then(function(result){
					JSONP.parse(results);
					console.log(results);
					return results.response;
				});
			}
			return {getArticles: getArticles};	
	}]);