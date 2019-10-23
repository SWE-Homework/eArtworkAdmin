import { Component, OnInit } from '@angular/core';
import {ArtworkService} from "../../service/artwork.service";
import {MatDialogRef} from "@angular/material";
import {NotificationService} from "../../shared/notification.service";
import {CategoryService} from "../../service/category.service";
import {OrderService} from "../../service/order.service";
import {IOrder} from "../../model/IOrder";

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  listStatus:any[]=[
    'Pending',
    'Purchased',
    'Shipped',
    'Delivered'
  ]

  order: IOrder;

  constructor(private service: OrderService,private dialogRef: MatDialogRef<OrderEditComponent>,
              private notificationService: NotificationService) { }

  ngOnInit() {


  }

  onSubmit() {

    this.order = this.service.formEditStatus.value;
    console.log(this.order);
    this.service.update(this.order).subscribe(data=>{

        this.notificationService.success("Order updated Successfully ");
        console.log("Success : "+data);
        this.service.filter("Register click");
      },
      error=>{
        this.notificationService.error("Error : "+error);
        console.log("Error : "+error);
      });

    this.service.formEditStatus.reset();
    //this.service.initializeFormGroup();
    this.onClose();

  }

  onClose(){
    this.service.formEditStatus.reset();
    // this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
