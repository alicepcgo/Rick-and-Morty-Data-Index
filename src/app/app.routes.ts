import { Routes } from '@angular/router';
import { ListingComponent } from './pages/listing/listing.component';
import { DetailComponent } from './pages/detail/detail.component';

export const routes: Routes = [
    {path: "", component: ListingComponent},
    {path: "detail/:type/:id", component: DetailComponent}
];
