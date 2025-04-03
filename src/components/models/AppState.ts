import { IProduct, IOrder } from '../../types/index';

export class AppState {
  catalog: IProduct[] = [];
  basket: IProduct[] = [];
  order: IOrder | null = null;
  preview: string | null = null;
  loading = false;

  setCatalog(data: IProduct[]) {}
  toggleBasketItem(item: IProduct) {}
  setOrder(data: IOrder) {}
  clearBasket() {}
  setPreview(itemId: string | null) {}
}