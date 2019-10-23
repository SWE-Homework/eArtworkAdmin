import { Injectable } from '@angular/core';
import {MatSnackBar,MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  config: MatSnackBarConfig= {
    duration: 3000,
    horizontalPosition: "center",
    verticalPosition: "top",
  }

  success(msg){
    this.config['panelClass']=['notification','success']
    this.snackBar.open(msg,'',this.config);
  }

  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }

  error(msg) {
    this.config['panelClass'] = ['notification', 'error'];
    this.snackBar.open(msg, '', this.config);
  }
}
