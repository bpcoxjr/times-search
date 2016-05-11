angular.module('timesSearchApp', ['ArticleServices', 'ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria', 'infinite-scroll'])

.config(['$locationProvider', '$routeProvider',
	function($locationProvider, $routeProvider){
		$routeProvider
		.when("/home", {
			templateUrl: "./partials/search.html",
			controller: "SearchController",
		})
		.when("/about", {
			templateUrl: "./partials/about.html",
			controller: "SearchController",
		})
		.when("/results", {
			templateUrl: "./partials/results.html",
			controller: "ResultsController",
		})
		.otherwise({
			redirectTo: "/home"
		});
	}
])

//disable Angular's debug mode, which is enabled by default
.config(['$compileProvider', function ($compileProvider) {
  	$compileProvider.debugInfoEnabled(false);
}]);


