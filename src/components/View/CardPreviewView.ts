import { IProduct } from '../../types/index';
import { BaseView } from '../base/BaseView';
import { IEvents } from '../base/events';

export class CardPreviewView extends BaseView<{ product: IProduct }> {
	public element: HTMLElement;

	protected titleElement: HTMLElement;
	protected descriptionElement: HTMLElement;
	protected imageElement: HTMLImageElement;
	protected categoryElement: HTMLElement;
	protected priceElement: HTMLElement;
	protected buttonElement: HTMLElement;
	protected data: IProduct;

	constructor(
		protected template: HTMLTemplateElement,
		protected events: IEvents
	) {
		super();
		this.element = template.content.firstElementChild!.cloneNode(
			true
		) as HTMLElement;

		this.titleElement = this.element.querySelector('.card__title')!;
		this.descriptionElement = this.element.querySelector('.card__text')!;
		this.imageElement = this.element.querySelector('.card__image')!;
		this.categoryElement = this.element.querySelector('.card__category')!;
		this.priceElement = this.element.querySelector('.card__price')!;
		this.buttonElement = this.element.querySelector('.card__button')!;
	}

	set product(data: IProduct) {
		this.data = data;
		this.titleElement.textContent = data.title;
		this.descriptionElement.textContent = data.description;
		this.imageElement.src = data.image;
		this.categoryElement.textContent = data.category;
		this.priceElement.textContent = `${data.price} синапсов`;

		this.buttonElement.addEventListener('click', () => {
			this.events.emit('card:add', {
				id: this.data.id,
				title: this.data.title,
				price: this.data.price,
			});
		});
	}
}
