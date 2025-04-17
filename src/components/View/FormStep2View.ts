import { IEvents } from '../base/events';
import { BaseView } from '../base/BaseView';

export class FormStep2View extends BaseView<{ isValid: boolean }> {
	public element: HTMLFormElement;

	protected emailInput: HTMLInputElement;
	protected phoneInput: HTMLInputElement;
	protected submitButton: HTMLButtonElement;

	constructor(
		protected template: HTMLTemplateElement,
		protected events: IEvents
	) {
		super();

		this.element = template.content.firstElementChild!.cloneNode(
			true
		) as HTMLFormElement;

		this.emailInput = this.element.querySelector('input[name="email"]')!;
		this.phoneInput = this.element.querySelector('input[name="phone"]')!;
		this.submitButton = this.element.querySelector('button[type="submit"]')!;

		this.element.addEventListener('input', () => {
			this.events.emit('order:step2:input');
		});

		this.element.addEventListener('submit', (event) => {
			event.preventDefault();
			this.events.emit('order:submit', this.getInputValues());
		});
	}

	set isValid(value: boolean) {
		this.submitButton.disabled = !value;
	}

	getInputValues(): { email: string; phone: string } {
		return {
			email: this.emailInput.value,
			phone: this.phoneInput.value,
		};
	}
}
