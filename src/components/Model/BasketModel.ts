import { IBasketItem, IBasketState } from '../../types/index';
import { IEvents } from '../base/events';

export class BasketModel {
	protected items: IBasketItem[] = [];

	constructor(protected events: IEvents) {}

	addItem(item: IBasketItem): void {
		const exists = this.items.some((el) => el.id === item.id);
		if (!exists) {
			this.items.push(item);
			this.events.emit('basket:changed');
		}
	}

	removeItem(id: string): void {
		this.items = this.items.filter((item) => item.id !== id);
		this.events.emit('basket:changed');
	}

	clear(): void {
		this.items = [];
		this.events.emit('basket:changed');
	}

	getItems(): IBasketItem[] {
		return this.items;
	}

	getTotal(): number {
		return this.items.reduce((total, item) => total + (item.price ?? 0), 0);
	}

	getState(): IBasketState {
		return {
			items: this.items,
			total: this.getTotal(),
		};
	}
}
