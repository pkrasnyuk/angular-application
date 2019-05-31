import { TemplateRef, ViewChild } from "@angular/core"
import { Component, OnInit } from "@angular/core"
import { Response } from "@angular/http"
import "rxjs/Rx";

import { User, UserType } from "./../../models/user.model"
import { AlertService } from "./../../services/alert.service"
import { UserService } from "./../../services/user.service"
import { EnumEx } from "./../../modules/common.module"

@Component(({
    templateUrl: "./home_component.html",
    providers: [UserService]
}) as any)
export class HomeComponent implements OnInit {

    @ViewChild("readOnlyTemplate") readOnlyTemplate: TemplateRef<any>;
    @ViewChild("editTemplate") editTemplate: TemplateRef<any>;

    currentUser: User;

    editedUser: User;
    users: Array<User>;
    isNewRecord: boolean;
    statusMessage: string;
    userTypeList: Array<any>;

    constructor(
        private serv: UserService,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.users = new Array<User>();
        this.userTypeList = EnumEx.getNamesAndValues(UserType);
    }

    ngOnInit() {
        this.loadUsers();
    }

    private loadUsers() {
        this.serv.getUsers().subscribe((resp: Response) => {
            this.users = resp.json();
        });
    }

    addUser() {
        this.editedUser = new User(0, "", "", UserType.Developer);
        this.users.push(this.editedUser);
        this.isNewRecord = true;
    }

    editUser(user: User) {
        this.editedUser = new User(user.id, user.username, user.email, user.type);
    }

    loadTemplate(user: User) {
        if (this.editedUser && this.editedUser.id == user.id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }

    saveUser() {
        if (this.isNewRecord) {
            this.serv.createUser(this.editedUser).subscribe(
                () => {
                    this.alertService.success("An user successfully added");
                },
                (responce: Response) => {
                    this.alertService.error(JSON.parse(responce.text()).message);
                },
                () => {
                    this.loadUsers();
                });
            this.isNewRecord = false;
        } else {
            this.serv.updateUser(this.editedUser.id, this.editedUser).subscribe(
                () => {
                    this.alertService.success("The user successfully updated");
                },
                (responce: Response) => {
                    this.alertService.error(JSON.parse(responce.text()).message);
                },
                () => {
                    this.loadUsers();
                });
        }
        this.editedUser = null;
    }

    deleteUser(user: User) {
        this.serv.deleteUser(user.id).subscribe(
            () => {
                this.alertService.success("The user successfully deleted");
                this.loadUsers();
            },
            (responce: Response) => {
                this.alertService.error(JSON.parse(responce.text()).message);
            });
    }

    cancel() {
        this.editedUser = null;
    }
}