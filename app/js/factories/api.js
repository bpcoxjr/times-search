//factory function for calls to NYT API//

var svc_search_v2_articlesearch = function(response){
	console.log(response);
};

angular.module('ArticleServices', [])

	.constant('apiKey', 'da049a2ebfeed654a53bd38ab6573867:9:60954891')
	.constant('url', '//api.nytimes.com/svc/search/v2/articlesearch')
	.constant('callback', 'svc_search_v2_articlesearch')

	.factory('articleFactory', ['$http', 'apiKey', 'url', 'callback', '$route', '$q', function($http, apiKey, url, callback, $route, $q){

			function getArticles(query){
				query = query || {};
				console.log(query);
				var params = {'response-format': 'jsonp', 'api-key': apiKey, 'callback': callback, 'q': query}; //NYT API required format
				

				return $http.get(url, {params
				}).then(function(result){
					JSON.parse(result);
					console.log(result);
					return result.response;
				});
			}
			return {getArticles: getArticles};	
	}]);

