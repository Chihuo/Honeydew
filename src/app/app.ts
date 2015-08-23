/// <reference path='../typings/angularjs/angular.d.ts'/>
/// <reference path='../typings/lodash/lodash.d.ts'/>

module Honeydew {
	var ngModule: ng.IModule = angular.module('Honeydew.app', []).config(config);

	registerServices();
	registerDirectives();
	
	/**
	 * config app module
	 */
	function config() { }

	function registerServices(): void { }

	function registerDirectives(): void {
		ngModule.directive('helloWorld', [() => { return new Directives.HelloWorld(); }])
		// _.each(Directives, (Directive: any) => {
		// 	if (Directive.ID) {
		// 		ngModule.directive(Directive.ID, () => { return Directive; });
		// 	}
		// });
	}
}