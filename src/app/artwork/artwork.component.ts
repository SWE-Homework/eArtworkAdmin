import { Component, OnInit } from '@angular/core';

import {MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../shared/notification.service";
import {ArtworkService} from "../service/artwork.service";
import {IArtwork} from "../model/IArtwork";
import {DatePipe} from "@angular/common";
import {CategoryService} from "../service/category.service";

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.scss']
})
export class ArtworkComponent implements OnInit {
  artwork : IArtwork;
  saveObjectReturned;
  listArtwork: any;
  categoryId: number=1;
  listCategory:any[];

    constructor(private service: ArtworkService,private dialogRef: MatDialogRef<ArtworkComponent>,
                private notificationService: NotificationService,
                private catService: CategoryService) { }

  ngOnInit() {
    this.catService.getList().subscribe(catData=>{
      this.listCategory=(<[]>catData);
    });
  }


  onClear(){

    this.service.form.reset();
    //this.service.initializeFormGroup();
    this.notificationService.warn("Form reinitialized");

  }

  onSubmit(){

    this.artwork=this.service.form.value
    console.log("good value : "+ this.artwork.category);

    if(this.service.form.get('artworkId').value){
      this.service.update(this.artwork, this.artwork.category).subscribe(data=>{
          this.saveObjectReturned=data;
          this.notificationService.success("Artwork updated Successfully ");
          console.log("Success : "+data);
          this.service.filter("Register click");
        },
        error=>{
          this.notificationService.error("Error : "+error);
          console.log("Error : "+error);
        });;
    }else{
      this.service.save(this.artwork,this.categoryId).subscribe(data=>{
          this.saveObjectReturned=data;
          this.notificationService.success("Artwork saved Successfully ");
          console.log("Success : "+data);
          this.service.filter("Register click");
        },
        error=>{
          this.notificationService.error("Error : "+error);
          console.log("Error : "+error);
        });
    }

    this.service.form.reset();
    //this.service.initializeFormGroup();
    this.onClose();
  }


  getList(){
    this.service.getList().subscribe(data=>{
      this.listArtwork=data;
      console.log(data);
    })
  }

  onClose(){
    this.service.form.reset();
   // this.service.initializeFormGroup();
    this.dialogRef.close();
  }



}
