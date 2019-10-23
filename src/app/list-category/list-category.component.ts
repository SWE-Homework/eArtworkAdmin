import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListCategoryDataSource, ListCategoryItem } from './list-category-datasource';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationService} from "../shared/notification.service";
import {DialogService} from "../shared/dialog.service";
import {CategoryService} from "../service/category.service";
import {CategoryComponent} from "../category/category.component";

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListCategoryItem>;
  dataSource: ListCategoryDataSource=new ListCategoryDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['categoryId', 'name','description','button'];

  searchKey: string;

  constructor(private service: CategoryService,

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
      console.log(dataResp);
      this.dataSource.data=(<[]> dataResp);
    })
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    console.log("In "+this.searchKey);
    this.dataSource.filter=this.searchKey;
  }

  newObject(){
    const configDia=new MatDialogConfig();
    configDia.width="60%"
    configDia.disableClose=true;
    configDia.autoFocus=true;
    this.dialog.open(CategoryComponent,configDia);
  }

  onEdit(obj){
    this.service.populateForm(obj);
    const configDia=new MatDialogConfig();
    configDia.width="60%"
    configDia.disableClose=true;
    configDia.autoFocus=true;
    this.dialog.open(CategoryComponent,configDia);
  }

  onDelete(key){
    this.dialogService.openConfirmDialog("Do you want to delete this category?")
      .afterClosed().subscribe(res=>{
      if(res==true){
        this.service.delete(key).subscribe(resp=>{
            this.notificationService.success("category deleted successfully")
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


}
