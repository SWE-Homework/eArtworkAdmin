import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Observable, Subject} from "rxjs";
import {IOrder} from "../model/IOrder";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formEditStatus: FormGroup=new FormGroup({
    orderId: new FormControl(null),
    status: new FormControl("", Validators.required)
  });

  order: IOrder;

  constructor(private httpClient: HttpClient) { }

  getList(){
    return this.httpClient.get("http://localhost:8080/eartwork/api/orders/list")
  }

  getOrderById(orderId){
    return this.httpClient.get("http://localhost:8080/eartwork/api/orders/getById/"+orderId)
  }

  delete(orderId){
    let loId: number = parseInt(orderId);
    console.log("Service Order Delete id : "+orderId);
    return this.httpClient.delete("http://localhost:8080/eartwork/api/orders/delete/"+loId);
  }

  update(order: IOrder){
    return this.httpClient.put("http://localhost:8080/eartwork/api/orders/update/"+order.orderId,order.status);
  }


  setFormEditStatus(orderId){
    this.formEditStatus.setValue({
    orderId: orderId,
      status:""});
  }

  private _listeners=new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners.next(filterBy);
  }

}
