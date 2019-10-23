import { Component, OnInit } from '@angular/core';
import {ICategory} from "../model/ICategory";
import {ArtworkService} from "../service/artwork.service";
import {MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../shared/notification.service";
import {CategoryService} from "../service/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: ICategory;

  constructor(private service: CategoryService,private dialogRef: MatDialogRef<CategoryComponent>,
              private notificationService: NotificationService) { }

  ngOnInit() {
  }

  onClear(){
    this.service.form.reset();
    //this.service.initializeFormGroup(); else
    console.log("in");
    this.notificationService.warn("Form reinitialized");
  }

  onSubmit(){

    this.category=this.service.form.value

    if(this.service.form.get('categoryId').value){
      this.service.update(this.category).subscribe(data=>{

          this.notificationService.success("Category updated Successfully ");
          console.log("Success : "+data);
          this.service.filter("Register click");
        },
        error=>{
          this.notificationService.error("Error : "+error);
          console.log("Error : "+error);
        });;
    }else{
      this.service.save(this.category).subscribe(data=>{
          this.notificationService.success("Category saved Successfully ");
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

  onClose(){
    this.service.form.reset();
    // this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
