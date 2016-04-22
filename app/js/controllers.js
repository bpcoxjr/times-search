angular.module('timesSearchApp')

.controller('SearchController', ['articleFactory', '$scope', '$location', function(DataServices, $scope, $location){

	//this function called when 'Search' button clicked
	$scope.submitForm = function($scope, articleFactory){
		var query = $scope.query;
		console.log('Form submitted. Searching NYT for: ' + query);
		articleFactory.getArticles($scope.query).then(
			function(results){
				$scope.results = results;
			});
		$location.path('/results');
	};

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