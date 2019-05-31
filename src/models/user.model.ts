export enum UserType {
    Developer,
    Engineer,
    Manager,
    Client
}

export class User {

    token: String;

    constructor(
        public id: Number,
        public username: String,
        public email: String,
        public type: UserType) {
    }
}

export class LoginUser {
    constructor(
        public email: String,
        public password: String) {
    }
}

export class RegisterUser {
    constructor(
        public username: String,
        public email: String,
        public type: UserType,
        public password: String) {
    }
}