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
		//console.log(convertedToDate);
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

	//make results header stick to top of page when scrolled to
	var $window = $(window);
		$stickyElement = $('#stickyResults'),
		elementTop = $stickyElement.offset().top;

	$window.scroll(function(){
		$stickyElement.toggleClass('sticky', $window.scrollTop() > elementTop);
	});



	// Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('#masthead').outerHeight();

	$(window).scroll(function(event){
	    didScroll = true;
	});

	setInterval(function() {
	    if (didScroll) {
	        hasScrolled();
	        didScroll = false;
	    }
	}, 200);

	function hasScrolled() {
	    var st = $(this).scrollTop();
	    
	    // Make sure they scroll more than delta
	    if(Math.abs(lastScrollTop - st) <= delta)
	        return;
	    
	    // If they scrolled down and are past the navbar, add class .nav-up.
	    // This is necessary so you never see what is "behind" the navbar.
	    if (st > lastScrollTop && st > navbarHeight){
	        // Scroll Down
	        $('#masthead').removeClass('masthead-down').addClass('masthead-up');
	    } else {
	        // Scroll Up
	        if(st + $(window).height() < $(document).height()) {
	            $('#masthead').removeClass('masthead-up').addClass('masthead-down');
	        }
	    }
	    
	    lastScrollTop = st;
	}
}]);