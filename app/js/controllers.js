angular.module('timesSearchApp')

.controller('mainCtrl', ['$scope', function($scope){}])

.controller('resultsCtrl', ['$scope', '$filter', function($scope, $filter, $location){
	
	$scope.date = new Date();

}]);