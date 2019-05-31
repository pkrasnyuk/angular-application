import { Headers, RequestOptions } from '@angular/http';

import { User } from "./../models/user.model"

export class EnumEx {
    static getNamesAndValues<T extends number>(e: any) {
        return EnumEx.getNames(e).map(n => ({ name: n, value: e[n] as T }));
    }

    static getNames(e: any) {
        return EnumEx.getObjValues(e).filter(v => typeof v === "string") as string[];
    }

    static getValues<T extends number>(e: any) {
        return EnumEx.getObjValues(e).filter(v => typeof v === "number") as T[];
    }

    private static getObjValues(e: any): (number | string)[] {
        return Object.keys(e).map(k => e[k]);
    }
}

export class AuthEx {

    static createAuthenticationHeader(withContextType: any) {
        const currentUser: User = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.token) {
            const headers = withContextType
                ? new Headers({
                    'Content-Type': "application/json;charset=utf-8",
                    "Authorization": `${currentUser.token}`
                })
                : new Headers({
                    "Authorization": `${currentUser.token}`
                });

            return new RequestOptions({ headers: headers });
        } else {
            const headers = withContextType
                ? new Headers({
                    'Content-Type': "application/json;charset=utf-8"
                })
                : new Headers();

            return new RequestOptions({ headers: headers });
        }
    }
}