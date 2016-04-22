//factory function for calls to NYT API//

angular.module('DataServices', [])

.factory('dataFactory', ['$http', '$route', '$q', function($http, $route, $q){

	var base-url = "http://api.nytimes.com/svc/search/v2/articlesearch";

	return{
		var request = {
			var q = searchTerm;
			var begin_date = $scope.fromDate;
			var end_date = $scope.toDate;
			var api-key = da049a2ebfeed654a53bd38ab6573867:9:60954891;
			var response-format = ".jsonp";
		}

		$http({
			method: 'GET',
			url: base-url,
			params: request
		})
		.success(function(results){
			console.log('NYT API query successful!');
			console.log(results);
			$scope.results = results;
		}).error(function(error){
			console.log('Uh oh! Something went wrong!');
		});
	}

}]);