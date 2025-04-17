export abstract class BaseView<T = unknown> {
    render(data: Partial<T>): HTMLElement {
      Object.assign(this, data);
      return (this as any).element;
    }
  }
  