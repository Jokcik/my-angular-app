import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Select, Store} from "@ngxs/store";
import {ProductsState, SetFreeProductsAction} from "~/app/shared/store/products.state";
import {FreeProducts} from "~/app/shared/classes/products";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    @Select(ProductsState.getFreeProducts) items: Observable<FreeProducts[]>;

    // This pattern makes use of Angular’s dependency injection implementation to
    // inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule,
    // defined in app.module.ts.
    constructor(private itemService: ItemService,
                private store: Store,
                private http: HttpClient) { }

    async ngOnInit(): Promise<void> {
        console.log('ngOnInit');
        const products = await this.http.get("https://delivery-club.store/api/products/free").pipe(map((value: any) => value.response)).toPromise();
        this.store.dispatch(new SetFreeProductsAction(products));

        // this.items = of(this.itemService.getItems());
    }
}
