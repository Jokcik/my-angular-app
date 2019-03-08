import {Action, Selector, State, StateContext} from '@ngxs/store';
import {FreeProducts} from "~/app/shared/classes/products";

export interface ProductsStateModel {
    freeProduct: FreeProducts[];
}

export class SetFreeProductsAction {
    static readonly type = '[CUPS] SetMainCup';
    constructor(public products: FreeProducts[]) {
    }

    apply(ctx: StateContext<ProductsStateModel>) {
        ctx.patchState({ freeProduct: this.products });
    }
}

@State<ProductsStateModel>({
    name: 'products',
    defaults: {
        freeProduct: []
    }
})
export class ProductsState {
    @Action(SetFreeProductsAction)
    setFreeProducts(ctx: StateContext<ProductsStateModel>, action: SetFreeProductsAction) { action.apply(ctx); }

    @Selector() static getFreeProducts(state: ProductsStateModel) { return state.freeProduct; }
}
