// === Вспомогательные типы ===
export type PaymentMethods = 'card' | 'cash' | '';
export type CategoryType = 'софт-скилл' | 'хард-скилл' | 'другое' | 'кнопка' | 'доп';

// Глобальное состояние приложения
export interface IAppState {
  catalog: IProduct[];
  order: IOrder | null;
  basket: IProduct[] | null;
  preview: string | null;
  loading: boolean;
}

// Продукт из API
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: CategoryType;
  price: number | null;
}

// Представление страницы
export interface IPage {
  counter: number;
  items: HTMLElement[];
}

// Карточка товара в галерее
export interface ICard {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  selected: boolean;
  button: string;
}

// Представление корзины
export interface IBasket {
  list: HTMLElement[];
  price: number;
}

// Части формы оформления заказа
export interface IOrderContacts {
  email: string;
  phone: string;
}

export interface IOrderDeliveryForm {
  payment: PaymentMethods;
  address: string;
}

// Полный заказ
export interface IOrder extends IOrderContacts, IOrderDeliveryForm {
  items: string[];
  total: number;
}

// Ответ от сервера после оформления
export interface IOrderSuccess {
  id: string;
  total: number;
}

// Событийная архитектура
export enum UiEvents {
    CardClick = 'card:click',
    AddToBasket = 'basket:add',
    RemoveFromBasket = 'basket:remove',
    SubmitOrder = 'order:submit',
  }
  
  export enum ModelEvents {
    CatalogUpdated = 'catalog:update',
    BasketUpdated = 'basket:update',
    OrderCompleted = 'order:complete',
  }
  