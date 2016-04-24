//factory function for calls to NYT API//

var svc_search_v2_articlesearch = function(response){
	console.log(response);
};

angular.module('ArticleServices', [])

	.constant('key', 'da049a2ebfeed654a53bd38ab6573867:9:60954891')
	.constant('baseUrl', '//api.nytimes.com/svc/search/v2/articlesearch')
	.constant('callback', 'callback=svc_search_v2_articlesearch')

	.factory('articleFactory', ['$http', 'key', 'baseUrl', 'callback', '$route', '$q', function($http, key, baseUrl, callback, $route, $q){

			function getArticles(query){
				query = query || {};
				console.log(query);
				var q = query;
				return $http.get(baseUrl + '.' + 'jsonp?' + '[' + q + ']' + callback + '&' + 'api-key=' + key).then(function(result){
					JSON.parse(result);
					console.log(result);
					return result.response;
				});
			}
			return {getArticles: getArticles};	
	}]);


//expected API construction:
//http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?[query]callback=svc_search_v2_articlesearch&api-key=da049a2ebfeed654a53bd38ab6573867:9:60954891