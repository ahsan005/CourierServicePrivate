import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {



  constructor(private http: HttpClient) { }
  // base_url=environment.baseUrlDebug;
  base_url=environment.baseUrl;


  url = this.base_url + '/Api/CourierService/OrderBookingBulk';

  UploadExcel(formData: FormData) {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };

    return this.http.post(this.url , formData, httpOptions)
  }
}
