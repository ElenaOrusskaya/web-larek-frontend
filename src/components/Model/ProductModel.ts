import { IProduct } from '../../types/index';
import { IEvents } from '../base/events';
import { CDN_URL } from '../../utils/constants';

export class ProductModel {
	protected items: IProduct[] = [];
	protected preview: string | null = null;

	constructor(protected events: IEvents) {}

	setItems(items: IProduct[]): void {
		this.items = items.map((item) => ({
			...item,
			image: `${CDN_URL}/${item.image}`,
		}));
		this.events.emit('products:changed');
	}

	getItems(): IProduct[] {
		return this.items;
	}

	getItem(id: string): IProduct | undefined {
		return this.items.find((item) => item.id === id);
	}

	setPreview(id: string): void {
		this.preview = id;
		this.events.emit('preview:changed', { id });
	}

	resetPreview(): void {
		this.preview = null;
		this.events.emit('preview:reset');
	}
}
