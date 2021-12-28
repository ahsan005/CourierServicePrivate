import { NotificationService } from "./../../../../services/notification.service";
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../../services/user.service";
import { Employee } from "../../../../models/employee";
import * as _ from "lodash";

@Component({
  selector: "ngx-edit-employee",
  templateUrl: "./edit-employee.component.html",
  styleUrls: ["./edit-employee.component.scss"],
})
export class EditEmployeeComponent implements OnInit {
  public employeeModel;
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
  editCourierForm;
  Initialize() {
    console.log(this.employeeModel);
    this.editCourierForm = this.fb.group({
      EmployeeId: [this.employeeModel.EmployeeId],
      EmployeeName: [this.employeeModel.EmployeeName, Validators.required],
      PartyLocationId: [this.employeeModel.PartyLocationId],
      Email: [this.employeeModel.Email, Validators.required],
      Mobile1: [this.employeeModel.Mobile1, Validators.required],
      CNIC: [this.employeeModel.CNIC, Validators.required],
      LicenseNo: [this.employeeModel.LicenseNo, Validators.required],
      DOB: [this.employeeModel.DOB, Validators.required],
      EmployeePictureString: [this.employeeModel.EmployeePictureString],
      CreatedById: [this.employeeModel.CreatedById],
    });
  }
  editCourierEmployeeObj;
  onSubmit() {
    this.onSubmitSpinner = true;
    console.log(this.editCourierForm);
    this.editCourierEmployeeObj = new Employee(this.editCourierForm.value);

    this.editCourierEmployeeObj.AlteredById = parseInt(
      localStorage.getItem("USERID")
    );

    console.log(this.editCourierEmployeeObj);

    this.userService
      .AddCourierEmployee(this.editCourierEmployeeObj)
      .subscribe((data) => {
        var response = JSON.parse(JSON.stringify(data));
        console.log(response);
        if (response.Status) {
          this.onSubmitSpinner = false;
          this.notificationService.showToast(
            "success",
            response.Message,
            "",
            "top-right"
          );
          this.modal.close("Close Modal");
          this.userService.filter("New Entry");
          console.log(response.Message);
        } else {
          this.onSubmitSpinner = false;
          this.notificationService.showToast(
            "danger",
            response.Message,
            "Operation failed",
            "top-right"
          );
        }
      });
  }

  ngOnInit(): void {
    this.Initialize();
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
