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
    console.log("Id artwork : "+this.artwork.artworkId);
    let loId=this.artwork.artworkId;
    //========file 1=======
    if(this.fileImg1)

    this.fileUploadService.save(this.fileImg1).subscribe(resp => {
      let img: string=(JSON.parse(JSON.stringify(resp)).fileName)
      console.log("Inside this image2 : "+ img);

           this.artwork.image1 =img;
           //========file 2=======
            if(this.fileImg2)

              this.fileUploadService.save(this.fileImg2).subscribe(resp => {
                  this.artwork.image2 =(JSON.parse(JSON.stringify(resp)).fileName);

                //========file 3=======
                  if(this.fileImg3)
                    this.fileUploadService.save(this.fileImg3).subscribe(resp => {
                      this.artwork.image3 =(JSON.parse(JSON.stringify(resp)).fileName);

                        //========Save and update=====

                      console.log("Id artwork : "+loId);
                      if(loId){


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

                    }, error => {
                      console.log("error 3: "+error);
                    });


              }, error => {
                console.log("error 2: "+error);
              });


        }, error => {
        console.log("error 1: "+error);
    });


    // this.artwork.image1 = m;
    // this.artwork.image2 = this.fileUploadService.save(this.fileImg2);
    // this.artwork.image3 = this.fileUploadService.save(this.fileImg3);

    console.log("Buno :" +JSON.parse(JSON.stringify(this.artwork)));
    console.log("good value : "+ this.artwork.image1+" / "+this.artwork.image2+" / "+this.artwork.image3);

        //this.service.initializeFormGroup();
    this.onClose();
  }

  saveAndUpdate(){
      let loId=this.service.form.get('artworkId').value
    if(loId){
      console.log("Id artwork : "+loId);

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
