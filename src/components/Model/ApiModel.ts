import { Api } from '../base/api';
import { IProduct, IOrder, IOrderResult } from '../../types/index';

export class LarekAPI extends Api {
	constructor(baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
	}

	getProducts(): Promise<{ items: IProduct[] }> {
		return this.get('/product') as Promise<{ items: IProduct[] }>;
	}

	postOrder(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order) as Promise<IOrderResult>;
	}
}
