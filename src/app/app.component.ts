import { Component } from "@angular/core";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
var orientation = require('nativescript-orientation');

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor() {
    }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        orientation.setOrientation("landscape");
        // orientation.disableRotation();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }
}
