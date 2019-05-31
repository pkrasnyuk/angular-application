import { Injectable } from "@angular/core"
import { Http } from "@angular/http"

import { User, RegisterUser } from "./../models/user.model"
import BaseConfig from "./../config/base.config"
import { AuthEx } from "./../modules/common.module"

@Injectable()
export class UserService {

    private url = BaseConfig.apiUrl + "/users";

    constructor(private http: Http) {
    }

    getUsers() {
        return this.http.get(this.url);
    }

    registerUser(obj: RegisterUser) {
        const body = JSON.stringify(obj);
        return this.http.post(this.url, body, AuthEx.createAuthenticationHeader(true));
    }

    createUser(obj: User) {
        const body = JSON.stringify(obj);
        return this.http.post(this.url, body, AuthEx.createAuthenticationHeader(true));
    }

    updateUser(id: Number, obj: User) {
        const body = JSON.stringify(obj);
        return this.http.put(this.url + "/" + id, body, AuthEx.createAuthenticationHeader(true));
    }

    deleteUser(id: Number) {
        return this.http.delete(this.url + "/" + id, AuthEx.createAuthenticationHeader(false));
    }
}