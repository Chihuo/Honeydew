module Honeydew.Controllers {
	export interface HelloWorldScope extends ModelScope<ViewModels.HelloWorld> {
		updatedValue: string;
		valueChange: () => void;
	}

	export class HelloWorldController extends BaseController<ViewModels.HelloWorld> {
		public scope: HelloWorldScope;

		init(): void {
			this.scope.valueChange = () => this.valueChange();
		}

		destroy(): void {

		}

		private valueChange(): void {
			this.scope.updatedValue = this.scope.viewModel.value + ' aha Hello World';
		}
	}
}