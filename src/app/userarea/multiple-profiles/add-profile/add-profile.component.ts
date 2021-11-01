import { ShipperProfile } from './../../../models/shipper-profile';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit {

  constructor(public modal: NgbActiveModal,private fb:FormBuilder) { }
addProfileVar:ShipperProfile;
  onSubmit() {
    this.addProfileVar = new ShipperProfile(this.addProfile.value)
    // this.listService.UpdateStudent(this.editedStudent).subscribe((result)=>{
    //   console.log("result",result);
    //   this.modal.close()
    //   this.listService.filter("Register click")
    // })
    console.log(this.addProfile,this.addProfileVar)
  }


  ngOnInit(): void {
    this.setForm();
  }

  // Add PRofile Form
  addProfile:any;
  setForm() {
    this.addProfile = this.fb.group({

      ShipperName: [''],
      ShipperPhone: [''],
      ShipperEmail: [''],
      ShipperAddress: [''],
    });
  // Add PRofile Form

  }

}
