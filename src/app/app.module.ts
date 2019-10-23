import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListArtworkComponent } from './list-artwork/list-artwork.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ListCategoryComponent } from './list-category/list-category.component';
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArtworkComponent} from "./artwork/artwork.component";
import {DatePipe} from "@angular/common";
import {MatConfirmDialogComponent} from "./mat-confirm-dialog/mat-confirm-dialog.component";
import {DialogService} from "./shared/dialog.service";
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    ListArtworkComponent,
    ListCategoryComponent,
    ArtworkComponent,
    MatConfirmDialogComponent,
    HomeComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ArtworkComponent,MatConfirmDialogComponent,CategoryComponent]
})
export class AppModule { }
