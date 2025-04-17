import { IEvents } from '../base/events';
import { BaseView } from '../base/BaseView';
import { TPaymentMethods } from '../../types/index';

export class FormStep1View extends BaseView<{ isValid: boolean }> {
	public element: HTMLFormElement;

	protected addressInput: HTMLInputElement;
	protected paymentButtons: NodeListOf<HTMLButtonElement>;
	protected submitButton: HTMLButtonElement;
	protected selectedPayment: TPaymentMethods | null = null;

	constructor(
		protected template: HTMLTemplateElement,
		protected events: IEvents
	) {
		super();

		this.element = template.content.firstElementChild!.cloneNode(
			true
		) as HTMLFormElement;

		this.addressInput = this.element.querySelector('input[name="address"]')!;
		this.paymentButtons = this.element.querySelectorAll(
			'.order__buttons button'
		);
		this.submitButton = this.element.querySelector('button[type="submit"]')!;

		this.addressInput.addEventListener('input', () => {
			this.events.emit('order:step1:input');
		});

		this.paymentButtons.forEach((button) => {
			button.addEventListener('click', () => {
				this.selectPayment(button.name as TPaymentMethods);
				this.events.emit('order:step1:input');
			});
		});

		this.element.addEventListener('submit', (event) => {
			event.preventDefault();
			this.events.emit('order:step1:submit', this.getInputValues());
		});
	}

	set isValid(value: boolean) {
		this.submitButton.disabled = !value;
	}

	private selectPayment(method: TPaymentMethods) {
		this.selectedPayment = method;
		this.paymentButtons.forEach((button) => {
			button.classList.toggle('button_alt-active', button.name === method);
		});
	}

	getInputValues(): { address: string; payment: TPaymentMethods } {
		return {
			address: this.addressInput.value,
			payment: this.selectedPayment as TPaymentMethods,
		};
	}
}
