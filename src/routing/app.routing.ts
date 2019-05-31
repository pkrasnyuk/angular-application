import { Routes, RouterModule } from "@angular/router"

import { HomeComponent } from "./../components/home/home.component"
import { LoginComponent } from "./../components/login/login.component"
import { RegisterComponent } from "./../components/register/register.component"
import { AuthGuard } from "./../security/auth.guard"

const appRoutes: Routes = [
    { path: "", component: HomeComponent, canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },

    { path: "**", redirectTo: "" }
];

export const routing = RouterModule.forRoot(appRoutes);