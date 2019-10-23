import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListCategoryComponent} from "./list-category/list-category.component";
import {ListArtworkComponent} from "./list-artwork/list-artwork.component";
import {HomeComponent} from "./home/home.component";
import {ListOrderComponent} from "./list-order/list-order.component";
import {UserAccountComponent} from "./user-account/user-account.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent,outlet: 'outlet1'},
  {path: 'listArtwork/:id/:name',component:ListArtworkComponent,outlet:'outlet1'},
  {path: 'listCategory',component:ListCategoryComponent,outlet:'outlet1'},
  {path: 'listOrder',component:ListOrderComponent,outlet:'outlet1'},
  {path: 'userAccount',component:UserAccountComponent,outlet:'outlet1'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
