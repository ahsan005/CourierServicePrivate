import { NotificationService } from "./../../../services/notification.service";
import { UserService } from "./../../../services/user.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit, ViewChild } from "@angular/core";
import * as _ from "lodash";
import { FormBuilder, Validators } from "@angular/forms";
import { Employee } from "../../../models/employee";

@Component({
  selector: "ngx-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  onSubmitSpinner: boolean = false;
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}
  @ViewChild("fileInput") fileInput;
  ngOnInit(): void {
    this.Initialize();
  }

  courierForm;

  Initialize() {
    this.courierForm = this.fb.group({
      EmployeeName: ["", Validators.required],

      Email: ["", Validators.required],
      Mobile1: ["", Validators.required],
      CNIC: ["", Validators.required],
      LicenseNo: ["", Validators.required],
      DOB: ["", Validators.required],
    });
  }
  courierObj = new Employee();

  onSubmit() {
    // this.editedStudent = new Student(this.studentEditForm.value)
    // this.listService.UpdateStudent(this.editedStudent).subscribe((result)=>{
    // console.log("result",result);
    this.onSubmitSpinner = true;
    let partyLocationId = localStorage.getItem("PARTYLOCATIONID");
    let createdById = localStorage.getItem("USERID");
    this.courierObj = this.courierForm.value;
    console.log(this.courierObj);
    this.courierObj.PartyLocationId = parseInt(partyLocationId);
    this.courierObj.CreatedById = parseInt(createdById);
    this.courierObj.EmployeePictureString = this.cardImageBase64;
    var DOB = JSON.parse(JSON.stringify(this.courierObj.DOB))
    console.log(DOB);
    // this.DOB.
    this.courierObj.DOB =  DOB.year+'-'+DOB.month+'-'+DOB.day

    console.log(this.courierObj);
    this.userService.AddEmployee(this.courierObj).subscribe((data) => {
      var response = JSON.parse(JSON.stringify(data));
      debugger;
      if (response.Status) {
        this.notificationService.showToast(
          "success",
          response.Message,
          "",
          "top-right"
        );
        this.onSubmitSpinner = false;
        this.modal.close();
      }
       else {
        this.notificationService.showToast(
          "danger",
          response.Message,
          "",
          "top-right"
        );
        this.onSubmitSpinner = false;
      }
    });

    // this.listService.filter("Register click")
    // })
    // console.log(this.studentEditForm,this.editedStudent)
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ["image/png", "image/jpeg"];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = "Maximum size allowed is " + max_size / 1000 + "Mb";

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = "Only Images are allowed ( JPG | PNG )";
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget["height"];
          const img_width = rs.currentTarget["width"];

          console.log(img_height, img_width);

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              "Maximum dimentions allowed " +
              max_height +
              "*" +
              max_width +
              "px";
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }
}
