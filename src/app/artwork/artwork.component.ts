import { Component, OnInit } from '@angular/core';

import {MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../shared/notification.service";
import {ArtworkService} from "../service/artwork.service";
import {IArtwork} from "../model/IArtwork";
import {DatePipe} from "@angular/common";
import {CategoryService} from "../service/category.service";
import {FileUploadService} from "../service/file-upload.service";

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
  fileImg1: File = null;
  fileImg2: File = null;
  fileImg3: File = null;
  fileSelected: number=1;
    constructor(private service: ArtworkService,private dialogRef: MatDialogRef<ArtworkComponent>,
                private notificationService: NotificationService,
                private catService: CategoryService, private  fileUploadService: FileUploadService) { }

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

    this.artwork=this.service.form.value;
    if(this.fileImg1)
    this.fileUploadService.save(this.fileImg1).subscribe(resp => {
           this.artwork.image1 =(JSON.parse(JSON.stringify(resp)).fileName);
        }, error => {

    });
    if(this.fileImg2)
    this.fileUploadService.save(this.fileImg2).subscribe(resp => {
      this.artwork.image2 =(JSON.parse(JSON.stringify(resp)).fileName);
    }, error => {

    });
    if(this.fileImg3)
    this.fileUploadService.save(this.fileImg3).subscribe(resp => {
      this.artwork.image3 =(JSON.parse(JSON.stringify(resp)).fileName);
    }, error => {

    });

    // this.artwork.image1 = m;
    // this.artwork.image2 = this.fileUploadService.save(this.fileImg2);
    // this.artwork.image3 = this.fileUploadService.save(this.fileImg3);

    console.log("good value : "+ this.artwork.category);

    if(this.service.form.get('artworkId').value){
      this.service.update(this.artwork, this.artwork.category).subscribe(data=>{
          console.log(this.artwork);
          console.log(JSON.parse(JSON.stringify(data)));
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
          console.log(this.artwork);
          console.log(JSON.parse(JSON.stringify(data)));
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

  onFileChange1(event, varN:number) {

    if (event.target.files.length > 0) {
      const file = <File>event.target.files[0];
      if(varN == 1) {
        this.fileImg1 = file;
      }
      if(varN == 2) {
        this.fileImg2 = file;
      }
      if(varN == 3) {
        this.fileImg3 = file;
        this.fileSelected=0;
      }
      this.fileSelected++
      console.log(varN);
      console.log(file);
    }
  }
  removeFileInput(varN: number){
    if(varN == 1) {
      this.fileImg1 = null;
    }
    if(varN == 2) {
      this.fileImg2 = null;
    }
    if(varN == 3) {
      this.fileImg3 = null;
    }
  }
}
