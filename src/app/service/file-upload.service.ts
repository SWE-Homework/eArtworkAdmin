import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }
  uploadURL = "http://localhost:8080/eartwork/api/uploadSingleFile";

  save(pic:File) {

      const fd = new FormData();
      fd.append('file', pic, pic.name);
      return this.httpClient.post(this.uploadURL, fd)
  }
}
