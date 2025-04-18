import { IBasketItem } from '../../types';
import { IEvents } from '../base/events';
import { BaseView } from '../base/BaseView';

export class BasketView extends BaseView<{
	list: IBasketItem[];
	total: string;
	isValid: boolean;
}> {
	public element: HTMLElement;

	protected listElement: HTMLElement;
	protected totalElement: HTMLElement;
	protected buttonElement: HTMLButtonElement;

	constructor(
		protected template: HTMLTemplateElement,
		protected events: IEvents
	) {
		super();
		this.element = this.template.content.firstElementChild!.cloneNode(
			true
		) as HTMLElement;

		this.listElement = this.element.querySelector('.basket__list')!;
		this.totalElement = this.element.querySelector('.basket__price')!;
		this.buttonElement = this.element.querySelector('.basket__button')!;

		this.buttonElement.addEventListener('click', () => {
			this.events.emit('basket:checkout');
		});
	}

	set list(items: IBasketItem[]) {
		this.listElement.innerHTML = '';

		items.forEach((item, index) => {
			const li = document.createElement('li');
			li.classList.add('basket__item', 'card', 'card_compact');

			const indexEl = document.createElement('span');
			indexEl.classList.add('basket__item-index');
			indexEl.textContent = (index + 1).toString();

			const titleEl = document.createElement('span');
			titleEl.classList.add('card__title');
			titleEl.textContent = item.title;

			const priceEl = document.createElement('span');
			priceEl.classList.add('card__price');
			priceEl.textContent =
				item.price == null ? 'Бесценный' : `${item.price} синапсов`;

			const deleteBtn = document.createElement('button');
			deleteBtn.classList.add('basket__item-delete');
			deleteBtn.setAttribute('data-id', item.id);
			deleteBtn.setAttribute('aria-label', 'удалить');
			deleteBtn.addEventListener('click', () => {
				this.events.emit('basket:item:remove', { id: item.id });
			});

			li.append(indexEl, titleEl, priceEl, deleteBtn);
			this.listElement.append(li);
		});
	}

	set total(value: string) {
		this.totalElement.textContent = value;
	}

	set isValid(value: boolean) {
		this.buttonElement.disabled = !value;
	}
}
