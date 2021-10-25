import { FileuploadService } from './../../services/fileupload.service';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-bulk-booking',
  templateUrl: './bulk-booking.component.html',
  styleUrls: ['./bulk-booking.component.scss']
})
export class BulkBookingComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  message: string;
  constructor(private http: HttpClient, private service: FileuploadService) { }

  ngOnInit(): void {
  }
  uploadFile() {
    let formData = new FormData();
    formData.append('upload', this.fileInput.nativeElement.files[0])

    this.service.UploadExcel(formData).subscribe(result => {
      this.message = result.toString();
      
    });

  }

}
