//factory function for calls to NYT API//

var svc_search_v2_articlesearch = function(result){
		console.log(result);
	};

angular.module('ArticleServices', [])

	.constant('key', '&api-key=da049a2ebfeed654a53bd38ab6573867:9:60954891')
	.constant('baseUrl', '//api.nytimes.com/svc/search/v2/articlesearch')
	.constant('callback', '&callback=svc_search_v2_articlesearch') //NYT API-specific requirement

	.factory('articleFactory', ['$http', 'key', 'baseUrl', 'callback', '$route', '$q', function($http, key, baseUrl, callback, $route, $q){

			function getArticles(query){
				query = query || {};
				console.log(query);
				var responseFormat = '.jsonp?';
				var q = 'q=' + query; //NYT API-specific requirement
				return $http.jsonp(baseUrl + responseFormat + q + callback + key).then(function(result){
					JSONP.parse(result);
					console.log(result);
					return result.response;
				});
			}
			return {getArticles: getArticles};	
	}]);