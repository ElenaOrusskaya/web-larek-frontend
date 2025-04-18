import './scss/styles.scss';

import { API_URL } from './utils/constants';
import { LarekAPI } from './components/Model/ApiModel';
import { ProductModel } from './components/Model/ProductModel';
import { CardView } from './components/View/CardView';
import { EventEmitter } from './components/base/events';
import {
	IProduct,
	TPaymentMethods,
	IBasketItem,
	IOrderResult,
} from './types/index';
import { ModalView } from './components/View/ModalView';
import { CardPreviewView } from './components/View/CardPreviewView';
import { BasketModel } from './components/Model/BasketModel';
import { BasketView } from './components/View/BasketView';
import { OrderModel } from './components/Model/OrderModel';
import { FormStep1View } from './components/View/FormStep1View';
import { FormStep2View } from './components/View/FormStep2View';
import { SuccessView } from './components/View/SuccessView';

const api = new LarekAPI(API_URL);
const events = new EventEmitter();
const productModel = new ProductModel(events);
const basketModel = new BasketModel(events);
const orderModel = new OrderModel(events);

const modal = new ModalView('#modal-container', events);
const cardPreviewTemplate = document.getElementById(
	'card-preview'
) as HTMLTemplateElement;
const cardPreview = new CardPreviewView(cardPreviewTemplate, events);
const basketCounter = document.querySelector('.header__basket-counter')!;

const catalogContainer = document.querySelector('.gallery')!;
const cardTemplate = document.getElementById(
	'card-catalog'
) as HTMLTemplateElement;
const basketTemplate = document.getElementById('basket') as HTMLTemplateElement;
const basketView = new BasketView(basketTemplate, events);
const basketButton = document.querySelector('.header__basket')!;

const orderTemplate = document.getElementById('order') as HTMLTemplateElement;
const formStep1View = new FormStep1View(orderTemplate, events);
const contactsTemplate = document.getElementById(
	'contacts'
) as HTMLTemplateElement;
const formStep2View = new FormStep2View(contactsTemplate, events);
const successTemplate = document.getElementById(
	'success'
) as HTMLTemplateElement;
const successView = new SuccessView(successTemplate, events);

api.getProducts().then((response: { items: IProduct[] }) => {
	productModel.setItems(response.items);
	const items = productModel.getItems();

	items.forEach((product) => {
		const card = new CardView(cardTemplate, events);
		const cardElement = card.render({ product });
		catalogContainer.append(cardElement);
	});
});

events.on('card:select', (data: { id: string }) => {
	const product = productModel.getItem(data.id);
	if (product) {
		const previewElement = cardPreview.render({ product });
		modal.setContent(previewElement);
	}
});

events.on('card:preview:close', () => {
	modal.close();
});

// Добавление в корзину
events.on('card:add', (product: IBasketItem) => {
	basketModel.addItem(product);
});

// Обновление счётчика корзины
events.on('basket:changed', () => {
	basketCounter.textContent = basketModel.getItems().length.toString();
});

events.on('basket:changed', () => {
	const state = basketModel.getState();
	if (modal.getContent().querySelector('.order-success')) {
		return;
	}
	const basketElement = basketView.render({
		list: state.items,
		total: `${state.total} синапсов`,
		isValid: state.items.length > 0,
	});

	modal.setContent(basketElement);
});

events.on('basket:item:remove', (data: { id: string }) => {
	basketModel.removeItem(data.id);
});

basketButton.addEventListener('click', () => {
	events.emit('basket:open');
});

events.on('basket:open', () => {
	const state = basketModel.getState();

	const basketElement = basketView.render({
		list: state.items,
		total: `${state.total} синапсов`,
		isValid: state.items.length > 0,
	});

	modal.setContent(basketElement);
});

events.on('basket:checkout', () => {
	const state = basketModel.getState();
	orderModel.setItems(
		state.items.map((item) => item.id),
		state.total
	);
	const element = formStep1View.render({ isValid: false });
	modal.setContent(element);
});

events.on('order:step1:input', () => {
	const values = formStep1View.getInputValues();
	const isValid = values.address.trim() !== '' && !!values.payment;
	formStep1View.render({ isValid });
});

events.on(
	'order:step1:submit',
	(data: { address: string; payment: TPaymentMethods }) => {
		orderModel.setStep1(data);
		const element = formStep2View.render({ isValid: false });
		modal.setContent(element);
	}
);

events.on('order:step2:input', () => {
	const values = formStep2View.getInputValues();
	const isValid = values.email.trim() !== '' && values.phone.trim() !== '';
	const element = formStep2View.render({ isValid });
	modal.setContent(element);
});

events.on('order:submit', (data: { email: string; phone: string }) => {
	orderModel.setStep2(data);

	const order = orderModel.getOrder();
	api.postOrder(order).then((result: IOrderResult) => {
		const success = successView.render({
			total: `${result.total} синапсов`,
		});

		modal.setContent(success);
		basketModel.clear();
		orderModel.reset();
	});
});

events.on('order:done', () => {
	modal.close();
});
