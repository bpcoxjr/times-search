//factory function for calls to NYT API//

angular.module('ArticleServices', [])

	.constant('key', '&api-key=VfdNuqX45gjlB0mwCiQx326R6x6vJlxB')
	.constant('baseUrl', '//api.nytimes.com/svc/search/v2/articlesearch')
	
	.factory('articleFactory', ['$http', '$rootScope', 'key', 'baseUrl', '$route', '$q', function($http, $rootScope, key, baseUrl, $route, $q){

				

		function getArticles(query, fromDate, toDate, fromDateforApi, toDateforApi, sortChoice){

			query = query || {};
			var responseFormat = '.json?';
			var q = 'q=' + query; //NYT API-specific requirement
			var begin_date = '&begin_date=' + fromDateforApi;
			var end_date = '&end_date=' + toDateforApi;
			var sort = '&sort=' + sortChoice;
			console.log('Searching NYT for ' + query + ' from ' + fromDateforApi + ' to ' + toDateforApi + ' sorted by ' + sortChoice + ' first.');
			return $http.get(baseUrl + responseFormat + q + begin_date + end_date + sort + key).then(function(results){
				console.log(results);
				//add random class to flex-boxes
				for(i=0; i < results.data.response.docs.length; i++){
					results.data.response.docs[i].class = (Math.random() > 0.5 ? 'flexbox-big ' + 'flex-box' : 'flex-box');
				}
				return results.data.response;
			});
		}
		return {getArticles: getArticles};	
}]);

