module Honeydew.Controllers {
	export interface ModelScope<T> extends ng.IScope {
		viewModel: T
	}

	export class BaseController<T> {
		public scope: ng.IScope;
		public viewModel: T;

		constructor(scope: ng.IScope, ModelType: { new (): T; }) {
			this.scope = scope;
			this.viewModel = this.scope["viewModel"] || new ModelType();

			this.scope["viewModel"] = this.viewModel;

			this.init();
			this.scope.$on('$destroy', () => {
				this.destroy();
			});
		}

		protected init(): void { };

		protected destroy(): void { }
	}
}