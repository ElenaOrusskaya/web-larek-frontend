import { IProduct } from '../../types/index';
import { IEvents } from '../base/events';
import { BaseView } from '../base/BaseView';

export class CardView extends BaseView<{ product: IProduct }> {
	public element: HTMLElement;

	protected titleElement: HTMLElement;
	protected priceElement: HTMLElement;
	protected imageElement: HTMLImageElement;
	protected categoryElement: HTMLElement;
	protected addButton: HTMLElement;
	protected data: IProduct;

	constructor(
		protected template: HTMLTemplateElement,
		protected events: IEvents
	) {
		super();
		this.element = this.template.content.firstElementChild!.cloneNode(
			true
		) as HTMLElement;

		this.titleElement = this.element.querySelector('.card__title')!;
		this.priceElement = this.element.querySelector('.card__price')!;
		this.imageElement = this.element.querySelector('.card__image')!;
		this.categoryElement = this.element.querySelector('.card__category')!;
	}

	set product(data: IProduct) {
		this.data = data;
		this.titleElement.textContent = data.title;
		this.priceElement.textContent =
			data.price === null ? 'Бесценный' : `${data.price} синапсов`;
		this.imageElement.src = data.image;
		this.categoryElement.textContent = data.category;

		this.element.addEventListener('click', () => {
			this.events.emit('card:select', { id: this.data.id });
		});
	}
}
