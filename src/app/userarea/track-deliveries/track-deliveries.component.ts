import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-track-deliveries',
  templateUrl: './track-deliveries.component.html',
  styleUrls: ['./track-deliveries.component.scss']
})
export class TrackDeliveriesComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.tracking);
  }

  tracking=this.fb.group({
    trackingNo: ['']
  })

}
