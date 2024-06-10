import { Routes } from '@angular/router';
import { ListingComponent } from './pages/listing/listing.component';
import { DetailComponent } from './pages/detail/detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "", component: ListingComponent, canActivate: [AuthGuard]},
    {path: "detail/:type/:id", component: DetailComponent, canActivate: [AuthGuard]},
    {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]}
];
