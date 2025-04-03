# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## 🧠 Архитектура проекта
Проект реализован по паттерну **MVP (Model-View-Presenter)** и разделён на 4 основных слоя:

### 1. API-клиент (слой API)
Отвечает за сетевые запросы и обработку данных с сервера.
- `Api`: клиент для работы с API (методы: получение каталога, оформление заказа).

### 2. Модели (Model)
Содержат данные и бизнес-логику:
- `ProductModel`: хранит и предоставляет товары каталога.
- `BasketModel`: управляет корзиной, товарами в заказе и оформлением заказа.

### 3. Представления (View)
Отвечают за отрисовку интерфейса:
- `CatalogView`: отображает список карточек товаров.
- `CardView`: отдельная карточка товара.
- `ModalView`: универсальный компонент модального окна.
- `ProductPreviewView`: отображает содержимое карточки в модалке.
- `BasketView`: отображает список выбранных товаров.
- `OrderFormView`: форма оформления заказа (два шага).
- `FormErrorsView`: отображает ошибки валидации форм.

### 4. Презентер (Presenter)
Управляющая логика, связывающая модель и представление. Размещена в основном скрипте приложения.
- Подписывается на UI-события (например, клик по карточке)
- Вызывает методы модели
- Обновляет представление при изменении модели

## 📡 Событийная модель
В проекте используется **брокер событий** на базе `EventEmitter`. Он обеспечивает слабую связность между компонентами. События делятся на:

### UiEvents (генерируются представлениями):
- `card:select`
- `card:add`
- `card:remove`
- `basket:open`
- `order:submit`

### ModelEvents (генерируются моделями):
- `basket:changed`
- `order:ready`
- `order:completed`
- `products:loaded`

## 🔄 Пример взаимодействия компонентов
**Сценарий: добавление товара в корзину.**
1. Пользователь кликает кнопку «Купить» на карточке (`CardView` генерирует событие `card:add`).
2. Презентер перехватывает событие и вызывает метод `BasketModel.addItem()`.
3. `BasketModel` обновляет данные и эмитит `basket:changed`.
4. Презентер слушает `basket:changed`, получает актуальные данные из `BasketModel` и вызывает `BasketView.render()`.
5. `BasketView` обновляет интерфейс корзины.

## 📑 Описание классов

### `Api`
Класс-клиент для работы с сервером.
- `getProductList(): Promise<IProduct[]>`
- `order(data: IOrder): Promise<IOrderResult>`

### `ProductModel`
- Поля: `products: IProduct[]`
- Методы: `setProducts()`, `getProductById()`

### `BasketModel`
- Поля: `items: IProduct[]`, `payment: PaymentMethod`, `address`, `email`, `phone`
- Методы: `addItem()`, `removeItem()`, `getTotal()`, `validateStep1()`, `validateStep2()`

### `CatalogView`
- Рендерит список карточек товаров.
- Генерирует события `card:select`, `card:add`

### `CardView`
- Рендер карточки товара.
- Методы: `render(product: IProduct)`, `toggleSelected()`

### `ModalView`
- Отображает любое содержимое в модальном окне.
- Методы: `open(content: HTMLElement)`, `close()`

### `ProductPreviewView`
- Рендерит подробности товара в модалке.

### `BasketView`
- Отображает содержимое корзины.

### `OrderFormView`
- Ввод данных заказа (шаг 1 — адрес, шаг 2 — контакты)

### `FormErrorsView`
- Отображает сообщения об ошибках

## 📘 Типы данных (описание интерфейсов см. в src/types/)
- `IProduct`: товар
- `IOrder`: данные заказа
- `IOrderResult`: результат заказа
- `IPaymentMethod`: метод оплаты
- `IFormErrors`: структура ошибок формы
- `IView`: базовый интерфейс представлений
- `IApiClient`: интерфейс API