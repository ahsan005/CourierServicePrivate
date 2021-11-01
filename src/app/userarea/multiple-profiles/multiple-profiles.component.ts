import { AddProfileComponent } from './add-profile/add-profile.component';
import { ShipperProfile } from './../../models/shipper-profile';
import { EditComponent } from './edit/edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableUtil } from './../../utilities/tableutil';
import { Input,Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-multiple-profiles",
  templateUrl: "./multiple-profiles.component.html",
  styleUrls: ["./multiple-profiles.component.scss"],
})
export class MultipleProfilesComponent implements OnInit {
  searchVal: any;

  @Input() public shipperProfile:ShipperProfile

  constructor(private modalService: NgbModal) {}
  // Modal Service Components
  AddBtn(){
    const ref = this.modalService.open(AddProfileComponent,{size:'xl'});

  }

  editBtn(item?:ShipperProfile){
    const ref = this.modalService.open(EditComponent,{size:'tiny'});
    this.shipperProfile = item
     ref.componentInstance.shipperProfileModel = this.shipperProfile;

     ref.result.then((yes)=>{
       console.log("ok Click")
     },
     (cancel)=>{
       console.log("cancel CLick")
     })
   }
   deleteBtn(){

   }
  // Modal Service Components


  ngOnInit(): void {}
  SearchFunction(){
    TableUtil.SearchFunction(this.searchVal);
  }
  exportTable(){
    TableUtil.exportToExcel('ExampleTable');
  }
  generatePDF(){
    TableUtil.generatePDF('ExampleTable');
  }
  shipperProfiles: Array<Object> = [
    {
      SrNo: 1,
      ShipperName: "Micheal",
      ShipperPhone: "0333-41111111",
      ShipperEmail: "ahsan105@icloud.com",
      ShipperAddress: "ABC Street",
    },
    {
      SrNo: 2,
      ShipperName: "Trevor",
      ShipperPhone: "0333-33333333",
      ShipperEmail: "Kill@icloud.com",
      ShipperAddress: "DEF Street",
    },
    {
      SrNo: 3,
      ShipperName: "Franklin",
      ShipperPhone: "0333-65674859",
      ShipperEmail: "TEST@icloud.com",
      ShipperAddress: "GHI Street",
    },
    {
      SrNo: 4,
      ShipperName: "Micheal Jordan",
      ShipperPhone: "0333-0987654321",
      ShipperEmail: "exotic@gmail.com",
      ShipperAddress: "XYZVBN Street",
    },

  ];
}
