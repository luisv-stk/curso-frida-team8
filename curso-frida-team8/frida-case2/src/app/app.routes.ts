import { Routes } from '@angular/router';
import { PersonalAreaPage } from './pages/personal-area-page/personal-area-page';
import { CardComponent } from './components/card/card.component';
import { ManageProductPage } from './pages/manage-product-page/manage-product-page';

export const routes: Routes = [
  { path: '', component: PersonalAreaPage },
  { path: 'personal-area', component: PersonalAreaPage },
  { path: 'card', component: CardComponent },
  { path: 'manage-product', component: ManageProductPage },
  { path: '**', redirectTo: '/personal-area' }
];
