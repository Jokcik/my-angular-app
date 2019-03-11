import {Action, Selector, State, StateContext} from '@ngxs/store';
import {FreeProducts, Products} from "~/app/shared/classes/products";

export interface ProductsStateModel {
    freeProduct: FreeProducts[];
    products: Products[];
}

export class SetFreeProductsAction {
    static readonly type = '[PRODUCTS] SetFreeProducts';
    constructor(public products: FreeProducts[]) {
    }

    apply(ctx: StateContext<ProductsStateModel>) {
        ctx.patchState({ freeProduct: this.products });
    }
}

export class SetProductsAction {
    static readonly type = '[PRODUCTS] SetProducts';
    constructor(public products: Products[]) {
    }

    apply(ctx: StateContext<ProductsStateModel>) {
        ctx.patchState({ products: this.products });
    }
}

@State<ProductsStateModel>({
    name: 'products',
    defaults: {
        freeProduct: [],
        products: []
    }
})
export class ProductsState {
    @Action(SetFreeProductsAction)
    setFreeProducts(ctx: StateContext<ProductsStateModel>, action: SetFreeProductsAction) { action.apply(ctx); }

    @Action(SetProductsAction)
    setProducts(ctx: StateContext<ProductsStateModel>, action: SetProductsAction) { action.apply(ctx); }

    @Selector() static getFreeProducts(state: ProductsStateModel) { return state.freeProduct; }
    @Selector() static getProducts(state: ProductsStateModel) { return state.products; }
    @Selector() static getProductsWithoutActive(state: ProductsStateModel) { return state.products && state.products.filter(product => product.active); }
}
