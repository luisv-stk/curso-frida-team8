import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page';
import { PersonalAreaPage } from './pages/personal-area-page/personal-area-page';
import { CardComponent } from './components/card/card.component';
import { ManageProductPage } from './pages/manage-product-page/manage-product-page';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'personal-area', component: PersonalAreaPage },
  { path: 'card', component: CardComponent },
  { path: 'manage-product', component: ManageProductPage },
  { path: '**', redirectTo: '/home' }
];
