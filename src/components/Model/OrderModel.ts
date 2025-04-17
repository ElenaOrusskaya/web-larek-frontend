import { IOrder, TPaymentMethods } from '../../types/index';
import { IEvents } from '../base/events';

export class OrderModel {
	public address: string = '';
	public payment: TPaymentMethods = 'card';
	public email: string = '';
	public phone: string = '';
	public items: string[] = [];
	public total: number = 0;

	constructor(public events: IEvents) {}

	setItems(items: string[], total: number): void {
		this.items = items;
		this.total = total;
	}

	setStep1(data: { address: string; payment: TPaymentMethods }): void {
		this.address = data.address;
		this.payment = data.payment;
		this.events.emit('order:step1');
	}

	setStep2(data: { email: string; phone: string }): void {
		this.email = data.email;
		this.phone = data.phone;
		this.events.emit('order:step2');
	}

	getOrder(): IOrder {
		return {
			address: this.address,
			payment: this.payment,
			email: this.email,
			phone: this.phone,
			items: this.items,
			total: this.total,
		};
	}

	reset(): void {
		this.address = '';
		this.payment = 'card';
		this.email = '';
		this.phone = '';
		this.items = [];
		this.events.emit('order:reset');
	}
}
