angular.module('timesSearchApp')

.controller('SearchController', ['articleFactory', '$scope', '$rootScope', '$location', '$filter', function(articleFactory, $scope, $rootScope, $location, $filter){

	$rootScope.results = [];

	//this function called when 'Search' button clicked
	$scope.submitForm = function(){
		var query = $scope.query;
		var fromDate = $scope.fromDate;
		var toDate = $scope.toDate;
		var sortChoice = $scope.sortChoice;
		var toDateforApi = $scope.toDateforApi;
		var fromDateforApi= $scope.fromDateforApi;
		console.log('Searching NYT for: ' + query + ' between ' + fromDateforApi + ' and ' + toDateforApi);
		articleFactory.getArticles($scope.query, $scope.fromDate, $scope.toDate, $scope.fromDateforApi, $scope.toDateforApi, $scope.sortChoice).then(
			function(results){
				//console.log(results);
				//$scope.results = $scope.results.docs;
				$rootScope.results = $rootScope.results.concat(results.docs);
				console.log($rootScope.results);
			});
		$location.path('/results');
	};

	$scope.$watch('fromDate', function(convertedFromDate){
		if(!convertedFromDate)return;
		//console.log(convertedFromDate);
		$scope.fromDateforApi = $filter('date')(new Date(convertedFromDate), 'yyyy-MM-dd');
		$scope.fromDateforApi = $scope.fromDateforApi.replace(/\D+/g, '');
		//console.log($scope.fromDateforApi);
	});

	$scope.$watch('toDate', function(convertedToDate){
		if(!convertedToDate)return;
		console.log(convertedToDate);
		$scope.toDateforApi = $filter('date')(new Date(convertedToDate), 'yyyy-MM-dd');
		$scope.toDateforApi = $scope.toDateforApi.replace(/\D+/g, '');
		//console.log($scope.toDateforApi);
	});
}])

.controller('ResultsController', ['articleFactory', '$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
	
	//date variable to show current date @ top of results page
	$rootScope.today = new Date();

	console.log($rootScope.results);

	//function executes when user clicks 'Go Back' button
	$scope.startOver = function(){
		document.getElementById("search-form").reset();
		$rootScope.results = [];
	};

	//function continuously loads more results as user scrolls 
	$scope.loadMoreResults = function(){
		var last = $rootScope.results[$rootScope.results.length - 1];
    	for(var i = 1; i <= 10; i++) {
      		$rootScope.results.push(last + i);
    	}
	};
}]);