// Интерфейс товара, приходящего с API и отображаемого в UI
export interface IProduct {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
  }
  
  // Интерфейс данных для оформления заказа
  export interface IOrder {
    payment: PaymentMethod;
    address: string;
    email: string;
    phone: string;
    items: string[]; // id товаров
  }
  
  // Результат заказа от API
  export interface IOrderResult {
    id: string;
    total: number;
  }
  
  // Способы оплаты
  export type PaymentMethod = 'card' | 'cash';
  
  // Структура формы контактов 
  export interface IContactsForm {
    email: string;
    phone: string;
  }
  
  // Структура формы адреса и способа оплаты
  export interface IOrderForm {
    address: string;
    payment: PaymentMethod;
  }
  
  // Структура ошибок валидации
  export interface IFormErrors {
    address?: string;
    email?: string;
    phone?: string;
  }
  
  // Интерфейс API-клиента
  export interface IApi {
    getProductList(): Promise<IProduct[]>;
    order(data: IOrder): Promise<IOrderResult>;
  }
  
  // Интерфейсы моделей
  export interface IProductModel {
    setProducts(products: IProduct[]): void;
    getProductById(id: string): IProduct | undefined;
  }
  
  export interface IBasketModel {
    addItem(product: IProduct): void;
    removeItem(id: string): void;
    getItems(): IProduct[];
    getTotal(): number;
    setOrderForm(data: IOrderForm): void;
    setContactsForm(data: IContactsForm): void;
    validateStep1(): boolean;
    validateStep2(): boolean;
    getOrderData(): IOrder;
  }
  
  // Интерфейсы представлений
  export interface IView<T> {
    render(data: T): void;
    clear(): void;
  }
  
  export interface ICatalogView extends IView<IProduct[]> {}
  export interface IBasketView extends IView<IProduct[]> {}
  export interface ICardView extends IView<IProduct> {
    toggleSelected(id: string): void;
  }
  export interface IModalView {
    open(content: HTMLElement): void;
    close(): void;
  }
  export interface IOrderFormView {
    renderStep1(data: IOrderForm): void;
    renderStep2(data: IContactsForm): void;
  }
  export interface IFormErrorsView {
    show(errors: IFormErrors): void;
    clear(): void;
  }
  
  // Перечисления событий UI и модели
  export enum UiEvents {
    CardSelect = 'card:select',
    CardAdd = 'card:add',
    CardRemove = 'card:remove',
    BasketOpen = 'basket:open',
    OrderSubmit = 'order:submit',
  }
  
  export enum ModelEvents {
    ProductsLoaded = 'products:loaded',
    BasketChanged = 'basket:changed',
    OrderReady = 'order:ready',
    OrderCompleted = 'order:completed',
  }
  