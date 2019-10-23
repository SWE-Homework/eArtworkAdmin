import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {IArtwork} from "../model/IArtwork";

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  form: FormGroup=new FormGroup({
      artworkId: new FormControl(null),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      artiste: new FormControl(''),
      shippingWeight: new FormControl(''),
      amount: new FormControl(''),
      category: new FormControl(0)


  })


  constructor(private httpClient: HttpClient,private datePipe: DatePipe) { }


  getList(){
    return this.httpClient.get("http://localhost:8080/eartwork/api/artworks/list")
  }

  save(artwork: IArtwork,categoryId: number){

    const artworkLo={
      "name": artwork.name,
      "description": artwork.description,
      "artiste": artwork.artiste,
      "shippingWeight": artwork.shippingWeight,
      "amount":  artwork.amount,
      "category": {
        "categoryId": artwork.category
      }

    }


    return this.httpClient.post("http://localhost:8080/eartwork/api/artworks/add",artworkLo);
  }

  update(artwork: IArtwork,categoryId: number){
    console.log("inside "+categoryId);
    const artworkLo={
      "name": artwork.name,
      "description": artwork.description,
      "artiste": artwork.artiste,
      "shippingWeight": artwork.shippingWeight,
      "amount":  artwork.amount,
      "category":{
        "categoryId": categoryId
      }

    }


    return this.httpClient.put("http://localhost:8080/eartwork/api/artworks/update/"+artwork.artworkId,artworkLo);
  }

  delete(artworkId){
    let loId: number = parseInt(artworkId);
    return this.httpClient.delete("http://localhost:8080/eartwork/api/artworks/delete/"+loId);
  }

  populateForm(artwork){
    console.log(artwork);
    console.log("Second : "+artwork.category.categoryId)
    this.form.setValue({
      "artworkId": artwork.artworkId,
      "name": artwork.name,
      "description": artwork.description,
      "artiste": artwork.artiste,
      "shippingWeight": artwork.shippingWeight,
      "amount":  artwork.amount,
      "category": artwork.category.categoryId

    })


  }

  private _listeners=new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }

  filter(filterBy: string){
    this._listeners.next(filterBy);
  }
}
