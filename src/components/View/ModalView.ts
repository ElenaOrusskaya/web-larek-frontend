import { IEvents } from '../base/events';

export class ModalView {
	protected modal: HTMLElement;
	protected content: HTMLElement;
	protected events: IEvents;

	constructor(modalSelector: string, events: IEvents) {
		this.modal = document.querySelector(modalSelector)!;
		this.content = this.modal.querySelector('.modal__content')!;
		this.events = events;

		this.setEventListeners();
	}

	setContent(template: HTMLElement): void {
		this.content.innerHTML = '';
		this.content.append(template);
		this.open();
	}

	getContent(): HTMLElement {
		return this.content;
	}

	open(): void {
		this.modal.classList.add('modal_active');
	}

	close(): void {
		this.modal.classList.remove('modal_active');
		this.content.innerHTML = '';
	}

	protected setEventListeners(): void {
		this.modal.addEventListener('click', (event) => {
			const target = event.target as HTMLElement;

			if (
				target.classList.contains('modal__close') ||
				target.classList.contains('modal') // клик по оверлею
			) {
				this.events.emit('card:preview:close');
			}
		});

		document.addEventListener('keydown', (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				this.events.emit('card:preview:close');
			}
		});
	}
}
