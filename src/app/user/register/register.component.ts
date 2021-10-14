import { Component, OnInit } from "@angular/core";
import { FormBuilder, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";





@Component({
  selector: "ngx-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],

})
export class RegisterComponent {

/// Cities Array 'Lahore', 'Islamabad', 'Karachi','Bhawalpur','Peshawar'


  selectedCity: string = '';

  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedCity = event.target.value;
    console.log(this.selectedCity)
  }
  // selectedLevel;
  // data:Array<Object> = [
  //     {id: 0, name: "name1"},
  //     {id: 1, name: "name2"}
  // ];
  cities:Array<Object>=[
    {id:"lahore",name:"lahore"},
    {id:"Islamabad",name:"Islamabad"},
    {id:"Peshawar",name:"Peshawar"},
    {id:"Karachi",name:"Karachi"},
    {id:"Bhawalpur",name:"Bhawalpur"},
    {id:"Quetta",name:"Quetta"},
    {id:"Faisalabad",name:"Faisalabad"},
  ]

  // selected(){
  //   alert(this.selectedLevel.name)
  // }
  // // Get Value from City Dropdown
  // selectedLevel;
  // selected(){
  //   console.log(this.selectedLevel)
  // };
  // Get Value from City Dropdown


  constructor(private fb: FormBuilder) {}

  // NgBootstrapModal methods
  // Angular ReactiveForms FormBuilder
  get cname(){return this.profileForm.get('cname')}
  profileForm = this.fb.group({
    cname: ["",Validators.required],
    buname: [""],
    baname: [""],
    accnum: [""],
    mnumber: [""],
    email:[""],
    city: [""],
    file: [null, Validators.required],
    pass: [""],
    confirmpass: [""]


  });
  onSubmit(){
    console.log(this.profileForm.value);
    alert(this.profileForm.value);
  }

  // FileUpload Stuff
  onFileChange(event) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.profileForm.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        // this.cd.markForCheck();
      };
    }
  }
  // FileUpload Stuff
  // Angular ReactiveForms FormBuilder
}
