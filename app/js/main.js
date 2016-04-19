angular.module('timesSearchApp', ['ngRoute'])

.config(['$locationProvider', '$routeProvider',
	function($locationProvider, $routeProvider){
		$routeProvider
		.when("/home", {
			templateUrl: "./partials/search.html",
			controller: "mainCtrl",
		})
		.when("/about", {
			templateUrl: "./partials/about.html",
			controller: "mainCtrl",
		})
		.when("/results", {
			templateUrl: "./partials/results.html",
			controller: "resultsCtrl",
		})
		.otherwise({
			redirectTo: "/home"
		});
	}
]);


