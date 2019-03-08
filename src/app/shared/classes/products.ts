export enum ProductType {
    DELIVERY = 'delivery-club',
    OKKO = 'okko',
    IVI = 'ivi',
    MVIDEO = 'Mvideo',
    MACDONALDS = 'macdonalds',
    OZON = 'ozon',
    YANDEX_EDA = 'Yandex Eda',
    GOODS = 'goods',
}

export class ProductItem {
    id: number;
    coupon: string;
    status: string;
}

export class Products {
    id: number;
    title: string;
    icon: string;
    description: string;
    poster: string;
    mime: "text" | "image";
    price: number;
    type: ProductType;
    count: number;
    active: boolean;
    exclusive: boolean;

    top: boolean;
    free: boolean;
    freeMin: number;
    status: string;
    sort: number;
}

export class FreeProducts {
    product: Products;
    items: { coupon: string; id: number; }[]
}

export class Freebie extends Products {
    finish: Date;
}
