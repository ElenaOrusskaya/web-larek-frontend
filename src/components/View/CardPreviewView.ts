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
		this.render({ product: data });
	}

	render(data: { product: IProduct }): HTMLElement {
		this.data = data.product;
		this.setTitle(data.product.title);
		this.setDescription(data.product.description);
		this.setImage(data.product.image);
		this.setCategory(data.product.category);
		this.setPrice(data.product.price);
		this.setButton(data.product);
		return this.element;
	}

	setTitle(title: string) {
		this.titleElement.textContent = title;
	}

	setDescription(description: string) {
		this.descriptionElement.textContent = description;
	}

	setImage(image: string) {
		this.imageElement.src = image;
	}

	setCategory(category: string) {
		this.categoryElement.textContent = category;
	}

	setPrice(price: number | null) {
		this.priceElement.textContent =
			price === null ? 'Бесценный' : `${price} синапсов`;
	}

	setButton(data: IProduct) {
		if (data.price === null) {
			this.buttonElement.setAttribute('disabled', 'true');
			this.buttonElement.classList.add('button_disabled');
			return;
		}

		this.buttonElement.removeAttribute('disabled');
		this.buttonElement.classList.remove('button_disabled');
		this.buttonElement.addEventListener('click', () => {
			this.events.emit('card:add', {
				id: data.id,
				title: data.title,
				price: data.price,
			});
		});
	}
}
