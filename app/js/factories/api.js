//factory function for calls to NYT API//

angular.module('ArticleServices', [])

	.constant('apiKey', 'da049a2ebfeed654a53bd38ab6573867:9:60954891')
	.constant('url', '//api.nytimes.com/svc/search/v2/articlesearch.jsonp?')
	.constant('callback', 'svc_search_v2_articlesearch')

	.factory('articleFactory', ['$http', 'apiKey', 'url', 'callback', '$route', '$q', function($http, apiKey, url, callback, $route, $q){

			function getArticles(query){
				query = query || {};
				console.log(query);
				var params = {'api-key': apiKey, 'callback': callback}; //NYT API required format
				angular.extend(query, params);

				return $http.get(url, {params: query
				}).then(function(result){
					return result.data;
				});
			}
			return getArticles();	
	}]);

