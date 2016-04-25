angular.module('timesSearchApp')

.controller('SearchController', ['articleFactory', '$scope', '$location', '$filter', function(articleFactory, $scope, $location, $filter){

	console.log(articleFactory);
	//this function called when 'Search' button clicked
	$scope.submitForm = function(){
		var query = $scope.query;
		var fromDate = $scope.fromDate;
		var toDate = $scope.toDate;
		var sortChoice = $scope.sortChoice
		console.log('Searching NYT for: ' + query + ' between ' + fromDate + ' and ' + toDate);
		articleFactory.getArticles($scope.query, $scope.fromDate, $scope.toDate, $scope.sortChoice).then(
			function(results){
				console.log(results);
				$scope.results = results;
			});
		$location.path('/results');
	};

	$scope.$watch('fromDate', function(convertedFromDate){
		$scope.fromDate = $filter('date')(convertedFromDate, 'yyyy-MM-dd');
		$scope.fromDate = convertedFromDate.replace(/\D+/g, '');
		console.log($scope.fromDate);
	});

	$scope.$watch('toDate', function(convertedToDate){
		$scope.toDate = $filter('date')(convertedToDate, 'yyyy-MM-dd');
		$scope.toDate = convertedToDate.replace(/\D+/g, '');
		console.log($scope.toDate);
	});

}])

.controller('ResultsController', ['articleFactory', '$scope', '$location', function($scope, $location){
	
	//date variable to show current date @ top of results page
	$scope.date = new Date();

	//function executes when user clicks 'Go Back' button
	$scope.startOver = function(){
		document.getElementById("search-form").reset();
		$scope.results = [];
		console.log('Returning to blank form!');
	};
}]);