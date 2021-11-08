import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
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
