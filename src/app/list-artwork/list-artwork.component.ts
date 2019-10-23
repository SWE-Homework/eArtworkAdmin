import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListArtworkDataSource, ListArtworkItem } from './list-artwork-datasource';
import {ArtworkService} from "../service/artwork.service";
import {ArtworkComponent} from "../artwork/artwork.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationService} from "../shared/notification.service";
import {DialogService} from "../shared/dialog.service";
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-list-artwork',
  templateUrl: './list-artwork.component.html',
  styleUrls: ['./list-artwork.component.scss']
})
export class ListArtworkComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ListArtworkItem>;
  dataSource: ListArtworkDataSource= new ListArtworkDataSource();

  searchKey: string;

  constructor(private artworkService: ArtworkService,

              private dialog:MatDialog,private notificationService:NotificationService,
              private dialogService: DialogService,
              private route: Router,
              private activatedRoute: ActivatedRoute){
    this.artworkService.listen().subscribe(m=>{
      console.log(m);
      this.getLisArtwork();
    });
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['artworkId', 'name','description','artiste','shippingWeight','amount','categoryId','categoryName','button'];


  ngOnInit() {
    let id=this.activatedRoute.snapshot.paramMap.get("id");
    let name=this.activatedRoute.snapshot.paramMap.get("name");
    console.log("id result : "+id+"/ "+"name : "+name);
    this.getLisArtwork();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getLisArtwork(){
    this.artworkService.getList().subscribe(dataResp=>{
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



  newArtwork(){
    const configDia=new MatDialogConfig();
    configDia.width="60%"
    configDia.disableClose=true;
    configDia.autoFocus=true;
    this.dialog.open(ArtworkComponent,configDia);
  }

  onEdit(obj){
    this.artworkService.populateForm(obj);
    const configDia=new MatDialogConfig();
    configDia.width="60%"
    configDia.disableClose=true;
    configDia.autoFocus=true;
    this.dialog.open(ArtworkComponent,configDia);
  }

  onDelete(key){
    // if(confirm("Do you want to delete this book?")){
    //   this.empService.deleteEmployee(key).subscribe(resp=>{
    //     this.notificationService.success("Book deleted successfully")
    //       this.getListEmployee();
    //   },
    //     error=>{
    //       this.notificationService.error("Delete was not successfull, error message :"+error);
    //     }
    //   );
    // }

    this.dialogService.openConfirmDialog("Do you want to delete this artwork?")
      .afterClosed().subscribe(res=>{
      if(res==true){
        this.artworkService.delete(key).subscribe(resp=>{
            this.notificationService.success("Artwork deleted successfully")
            this.getLisArtwork();
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
