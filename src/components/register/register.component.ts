import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { Response } from "@angular/http"

import { RegisterUser } from "./../../models/user.model"
import { AlertService } from "./../../services/alert.service"
import { UserService } from "./../../services/user.service"
import { EnumEx } from "./../../modules/common.module"
import { UserType } from "./../../models/user.model"

@Component({
    templateUrl: "./register_component.html"
} as any)
export class RegisterComponent {
    model: any = {};
    loading = false;
    userTypeList: Array<any>;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
        this.userTypeList = EnumEx.getNamesAndValues(UserType);
    }

    register() {
        this.loading = true;
        const user = new RegisterUser(this.model.username, this.model.email, this.model.type, this.model.password);
        this.userService.registerUser(user)
            .subscribe(
                () => {
                    this.alertService.success("Registration successful", true);
                    this.router.navigate(["/login"]);
                },
                (responce: Response) => {
                    this.alertService.error(JSON.parse(responce.text()).message);
                    this.loading = false;
                });
    }
}