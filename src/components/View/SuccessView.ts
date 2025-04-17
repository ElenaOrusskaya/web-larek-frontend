import { BaseView } from '../base/BaseView';
import { IEvents } from '../base/events';

export class SuccessView extends BaseView<{ total: string }> {
	public element: HTMLElement;

	protected titleElement: HTMLElement;
	protected descriptionElement: HTMLElement;
	protected buttonElement: HTMLButtonElement;

	constructor(
		protected template: HTMLTemplateElement,
		protected events: IEvents
	) {
		super();
		this.element = this.template.content.firstElementChild!.cloneNode(
			true
		) as HTMLElement;

		this.titleElement = this.element.querySelector('.order-success__title')!;
		this.descriptionElement = this.element.querySelector(
			'.order-success__description'
		)!;
		this.buttonElement = this.element.querySelector('.order-success__close')!;

		this.buttonElement.addEventListener('click', () => {
			this.events.emit('order:done');
		});
	}

	set total(value: string) {
		this.descriptionElement.textContent = `Списано ${value}`;
	}
}
