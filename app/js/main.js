angular.module('timesSearchApp', ['DataServices', 'ngRoute', 'infinite-scroll'])

.config(['$locationProvider', '$routeProvider',
	function($locationProvider, $routeProvider){
		$routeProvider
		.when("/home", {
			templateUrl: "./partials/search.html",
			controller: "MainCtrl",
		})
		.when("/about", {
			templateUrl: "./partials/about.html",
			controller: "MainCtrl",
		})
		.when("/results", {
			templateUrl: "./partials/results.html",
			controller: "ResultsCtrl",
		})
		.otherwise({
			redirectTo: "/home"
		});
	}
]);


