import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListArtworkComponent} from "./list-artwork/list-artwork.component";
import {ListCategoryComponent} from "./list-category/list-category.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admineartwork';


  constructor(private _router: Router, private _activedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loadHomePage();
  }

  loadHomePage() {
    this._router.navigate([{outlets: {outlet1: ['home']}}], {skipLocationChange: true})
  }

  artworkManagement() {
    this._router.navigate([{outlets: {outlet1: ['listArtwork','first param','second']}}], {skipLocationChange: true})
  }

  categoryManagement() {
    this._router.navigate([{outlets: {outlet1: ['listCategory']}}], {skipLocationChange: true})
  }


}
