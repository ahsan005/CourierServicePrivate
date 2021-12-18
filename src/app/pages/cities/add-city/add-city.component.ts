import { SharedService } from './../../../services/shared.service';
import { LOV } from './../../../models/citiesLOV';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent implements OnInit {
  selectedCountryID;
  selectedProvinceID;
  cityName;
  showCityField:boolean = false;
  showProvinceField:boolean = false;
  countriesLOV = new Array<LOV>();
  provincesLOV = new Array<LOV>();

  constructor(public modal: NgbActiveModal,private sharedService:SharedService) {
    this.initialize();
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
      this.sharedService.GetAllCountries().subscribe((data)=>{
        var response = JSON.parse(JSON.stringify(data));
        this.countriesLOV = response.Data;
      })
  }

  loadProvinces(){
    console.log(this.selectedCountryID)
    this.sharedService.GetProvincesByCountry(this.selectedCountryID).subscribe((data)=>{
      var response = JSON.parse(JSON.stringify(data));
      this.provincesLOV = response.Data;
      console.log(this.provincesLOV);
      console.log(response);
      if(response.Status)
    this.showProvinceField = true;
    })

  }

  loadCities(){
    this.showCityField = true;
  }



  onSubmit() {
    // this.editedStudent = new Student(this.studentEditForm.value)
    // this.listService.UpdateStudent(this.editedStudent).subscribe((result)=>{
      // console.log("result",result);
      this.modal.close()
      // this.listService.filter("Register click")
    // })
    // console.log(this.studentEditForm,this.editedStudent)
  }


}
