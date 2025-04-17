export type TPaymentMethods = 'card' | 'cash';

export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
	price: number;
}

export interface IBasketItem {
	id: string;
	title: string;
	price: number;
}

export interface IBasketState {
	items: IBasketItem[];
	total: number;
}

export interface IOrder {
	payment: TPaymentMethods;
	address: string;
	email: string;
	phone: string;
	items: string[];
	total: number;
}

export interface IOrderResult {
	id: string;
	total: number;
}
