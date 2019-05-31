import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./../components/app/app.component";
import { AlertComponent } from "./../components/alert/alert.component"
import { HomeComponent } from "./../components/home/home.component"
import { LoginComponent } from "./../components/login/login.component"
import { RegisterComponent } from "./../components/register/register.component"

import { AlertService } from "./../services/alert.service"
import { AuthenticationService } from "./../services/authentication.service"
import { UserService } from "./../services/user.service"

import { AuthGuard } from "./../security/auth.guard"
import { routing } from "./../routing/app.routing"

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        AlertService,
        AuthenticationService,
        UserService,
        AuthGuard
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }