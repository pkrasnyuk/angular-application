import { Component, OnDestroy } from "@angular/core"
import { Subscription } from "rxjs/Subscription"

import { AlertService } from "./../../services/alert.service"

@Component({
    selector: "alert",
    templateUrl: "./alert_component.html"
} as any)
export class AlertComponent implements OnDestroy {

    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) {
        this.subscription = alertService.getMessage().subscribe(message => { this.message = message; });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}