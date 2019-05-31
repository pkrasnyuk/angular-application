import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import "rxjs/add/operator/map"

import { User, LoginUser } from "./../models/user.model"
import BaseConfig from "./../config/base.config"

@Injectable()
export class AuthenticationService {

    private url = BaseConfig.apiUrl + "/authenticate";

    constructor(private http: Http) { }

    login(model: LoginUser) {
        return this.http.post(this.url, { email: model.email, password: model.password })
            .map((response: Response) => {

                let result = response.json();
                let user = new User(result.id, result.username, result.email, result.type);
                user.token = result.token;
                if (user.token) {
                    localStorage.setItem("currentUser", JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        localStorage.removeItem("currentUser");
    }
}