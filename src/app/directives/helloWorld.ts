module Honeydew.Directives {
	export class HelloWorld implements ng.IDirective {
		public static ID = 'helloWorld';
		restrict = 'E';
		replace = true;
		templateUrl = 'app/views/helloWorld.html';
		controller = ['$scope', ($scope: Controllers.HelloWorldScope) => {
			return new Controllers.HelloWorldController($scope, ViewModels.HelloWorld);
		}];
	}
}