import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IArtwork} from "../model/IArtwork";
import {ICategory} from "../model/ICategory";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  form: FormGroup=new FormGroup({
    categoryId: new FormControl(null),
    name: new FormControl('', Validators.required),
    description: new FormControl('')
  })

  constructor(private httpClient: HttpClient) { }

  getList(){
    return this.httpClient.get("http://localhost:8080/eartwork/api/categories/list")
  }

  save(category: ICategory){

    const categoryLo={
      "name": category.name,
      "description": category.description,

    }
    return this.httpClient.post("http://localhost:8080/eartwork/api/categories/add",categoryLo);
  }

  update(category: ICategory){
    const categoryLo={
      "name": category.name,
      "description": category.description,

    }
    return this.httpClient.put("http://localhost:8080/eartwork/api/categories/update/"+category.categoryId,categoryLo);
  }

  delete(categoryId){
    let loId: number = parseInt(categoryId);
    return this.httpClient.delete("http://localhost:8080/eartwork/api/categories/delete/"+loId);
  }

  populateForm(obj){

    this.form.setValue({
      "categoryId": obj.categoryId,
      "name": obj.name,
      "description": obj.description

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
