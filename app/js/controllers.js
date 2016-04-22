angular.module('timesSearchApp')

.controller('MainCtrl', ['DataServices', '$scope', '$location', function(DataServices, $scope, $location){

	//form not submitted when app initializes
	$scope.formSubmitted = false; 

	//this function called when 'Search' button clicked
	$scope.submitForm = function(){
		$scope.formSubmitted = true;
		var searchTerm = $scope.searchTerm;
		$location.path('/results');
		console.log('Form submitted. Searching NYT for: ' + searchTerm);
	};

}])

.controller('ResultsCtrl', ['DataServices', '$scope', '$location', function($scope, $location){
	
	//date variable to show current date @ top of results page
	$scope.date = new Date();

	//function executes when user clicks 'Go Back' button
	$scope.startOver = function(){
		document.getElementById("search-form").reset();
		$scope.formSubmitted = false;
		$scope.results = [];
		console.log('Returning to blank form!');
	};
}]);