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
		console.log('Searching NYT for ' + query + ' between ' + fromDateforApi + ' and ' + toDateforApi);
		articleFactory.getArticles($scope.query, $scope.fromDate, $scope.toDate, $scope.fromDateforApi, $scope.toDateforApi, $scope.sortChoice).then(
			function(results){
				$rootScope.results = $rootScope.results.concat(results.docs);
				console.log($srootScope.results);
			});
		$location.path('/results');

		//set minimum date on 'to date' input so 'to date' has to be later than 'from date'
		$rootScope.moreThanFrom = $filter('date')(($rootScope.fromDate), 'yyyy-MM-dd');
		console.log($scope.moreThanFrom);
	};

	//convert user date input to format required by NYT API
	$scope.$watch('fromDate', function(convertedFromDate){
		if(!convertedFromDate)return;
		$rootScope.fromDateforApi = $filter('date')(new Date(convertedFromDate), 'yyyy-MM-dd');
		$rootScope.fromDateforApi = $rootScope.fromDateforApi.replace(/\D+/g, '');
	});

	$scope.$watch('toDate', function(convertedToDate){
		if(!convertedToDate)return;
		$rootScope.toDateforApi = $filter('date')(new Date(convertedToDate), 'yyyy-MM-dd');
		$rootScope.toDateforApi = $rootScope.toDateforApi.replace(/\D+/g, '');
	});

	//set max date attribute input to current date
	$scope.maxDate = $filter('date')(new Date(), 'yyyy-MM-dd');
	//console.log($scope.maxDate);
}])

.controller('ResultsController', ['articleFactory', '$scope', '$rootScope', '$http', '$location', '$filter', function(articleFactory, $scope, $rootScope, $location, $filter){
	
	//date variable to show current date @ top of results page
	$rootScope.today = new Date();

	//function executes when user clicks 'Go Back' button
	$scope.startOver = function(){
		document.getElementById("search-form").reset();
		$rootScope.results = [];
		$location.path('/home');
	};

   /*$scope.eventClass = function(){
   		if (Math.random() > 0.5) {
   			return 'flex-box ' + 'flexbox-big';
   		}
   		else {
   			return 'flex-box';
   		}
   };*/

   $scope.classController = function($scope){
	   	$scope.eventClass = function(){
	   		if (Math.random() > 0.5) {
	   			return 'flex-box ' + 'flexbox-big';
	   		}
	   		else {
	   			return 'flex-box';
	   		}
   		};
   };

	//make results header stick to top of page when scrolled to
	var $window = $(window),
		$stickyElement = $('#stickyResults'),
		elementTop = $stickyElement.offset().top;

	$window.scroll(function(){
		$stickyElement.toggleClass('sticky', $window.scrollTop() > elementTop);
	});

	//infinite Scrolling
    /*$scope.loadMoreResults = function() {
    	console.log("Loading more results!");
    	articleFactory.getArticles($rootScope.query, $rootScope.fromDate, $rootScope.toDate, $rootScope.fromDateforApi, $rootScope.toDateforApi, $rootScope.sortChoice).then(
			function(results){
				$rootScope.results = $rootScope.results.concat(results.docs);
				console.log($rootScope.results);
			});
    	return($rootScope.results);
    };*/
}]);