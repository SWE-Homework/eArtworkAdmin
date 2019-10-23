import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListOrderDataSource, ListOrderItem } from './list-order-datasource';
import {CategoryService} from "../service/category.service";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {NotificationService} from "../shared/notification.service";
import {DialogService} from "../shared/dialog.service";
import {OrderService} from "../service/order.service";
import {ArtworkComponent} from "../artwork/artwork.component";
import {OrderEditComponent} from "./order-edit/order-edit.component";
import {IOrder} from "../model/IOrder";

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListOrderItem>;
  dataSource: ListOrderDataSource=new ListOrderDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['orderId','status','dateCreated', 'button'];

  searchKey: string;

  constructor(private service: OrderService,
              private dialog:MatDialog,private notificationService:NotificationService,
              private dialogService: DialogService){

    this.service.listen().subscribe(m=>{
      console.log(m);
      this.getList();
    });

  }

  ngOnInit() {
    this.getList();

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getList(){
    this.service.getList().subscribe(dataResp=>{
      this.dataSource.data=(<[]> dataResp);
    })
  }

  editStatus(orderId){
    const configDia=new MatDialogConfig();

    this.service.getOrderById(orderId).subscribe(dataResp=>{

      this.service.order=(<IOrder>dataResp);
      console.log(this.service.order);
      console.log(status);
    });
    this.service.setFormEditStatus(orderId);
    configDia.width="60%";
    configDia.disableClose=true;
    configDia.autoFocus=true;
    this.dialog.open(OrderEditComponent,configDia);
  }

  onDelete(orderId){
    this.dialogService.openConfirmDialog("Do you want to delete this Order?")
      .afterClosed().subscribe(res=>{
      if(res==true){
        this.service.delete(orderId).subscribe(resp=>{
            this.notificationService.success("Order deleted successfully")
            this.getList();
          },
          error=>{
            this.notificationService.error("Delete was not successfull, error message :"+error);
          }
        );

      }else{

      }
    });

  }

  new(){
    const configDia=new MatDialogConfig();
    configDia.width="60%"
    configDia.disableClose=true;
    configDia.autoFocus=true;
    this.dialog.open(ArtworkComponent,configDia);
  }

  onEdit(obj){

    const configDia=new MatDialogConfig();
    configDia.width="60%"
    configDia.disableClose=true;
    configDia.autoFocus=true;
    this.dialog.open(ArtworkComponent,configDia);
  }
}
