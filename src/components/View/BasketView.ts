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

			li.innerHTML = `
        <span class="basket__item-index">${index + 1}</span>
        <span class="card__title">${item.title}</span>
        <span class="card__price">${item.price} синапсов</span>
        <button class="basket__item-delete" data-id="${
					item.id
				}" aria-label="удалить"></button>
      `;

			li.querySelector('.basket__item-delete')!.addEventListener(
				'click',
				() => {
					this.events.emit('basket:item:remove', { id: item.id });
				}
			);

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
