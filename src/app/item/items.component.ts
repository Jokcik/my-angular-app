import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ItemService} from "./item.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Select, Store} from "@ngxs/store";
import {ProductsState, SetFreeProductsAction, SetProductsAction} from "~/app/shared/store/products.state";
import {FreeProducts, ProductItem, Products} from "~/app/shared/classes/products";
import * as app from 'tns-core-modules/application';
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import {isAndroid, isIOS} from "tns-core-modules/platform";
// var clipboard = require("nativescript-clipboard");

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    @Select(ProductsState.getFreeProducts) items$: Observable<FreeProducts[]>;
    @Select(ProductsState.getProductsWithoutActive) products$: Observable<Products[]>;

    public ios: boolean = isIOS;
    public android: boolean = isAndroid;

    constructor(private itemService: ItemService,
                private store: Store,
                private http: HttpClient) { }

    ngOnInit(): void {
        this.setFreeProducts();
        this.setProducts();
    }

    public async setProducts() {
        const products = await this.http.get("https://delivery-club.store/api/products").pipe(map((value: any) => value.response)).toPromise();
        this.store.dispatch(new SetProductsAction(products));
    }

    public async setFreeProducts() {
        const products = await this.http.get("https://delivery-club.store/api/products/free").pipe(map((value: any) => value.response)).toPromise();
        this.store.dispatch(new SetFreeProductsAction(products));
    }

    public async copy(item: FreeProducts) {
        // new ToolTip(frame.topmost().getViewById("someView"),{text:"Some Text"});
        // console.log(new ToolTip.ToolTip(null, null));
        // var tooltip = new Tooltip(obj, { text: 'SOME' });
        // tooltip.show();
        // console.log(tooltip);
        // await clipboard.setText(item.items[0].coupon);
        // const tip = new ToolTip(obj,{text:"Some Text"});
        // tip.show();  //.hide()
    }

    public buy(item: Products, obj: any) {
        // admob.createBanner({
        //     // if this 'view' property is not set, the banner is overlayed on the current view
        //     // view: ..,
        //     testing: true, // set to false to get real banners
        //     size: 1, // anything in admob.AD_SIZE, like admob.AD_SIZE.SMART_BANNER
        //     iosBannerId: "ca-app-pub-XXXXXX/YYYYYY", // add your own
        //     androidBannerId: "ca-app-pub-AAAAAAAA/BBBBBBB", // add your own
        //     // Android adds the connected device as test device with testing:true, iOS does not
        //     iosTestDeviceIds: ["yourTestDeviceUDIDs", "canBeAddedHere"],
        //     margins: {
        //         // if both are set, top wins
        //         //top: 10
        //         bottom: 50
        //     }
        // }).then(
        //     function() {
        //         console.log("admob createBanner done");
        //     },
        //     function(error) {
        //         console.log("admob createBanner error: " + error);
        //     }
        // )
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public format(title: string) {
        return `<p style="font-size: 14px; font-family: "FontAwesome", fontawesome-webfont">${title}</p>`
    }
}
