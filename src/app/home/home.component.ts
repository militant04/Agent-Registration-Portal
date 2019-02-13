import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import {HttpClient} from "@angular/common/http";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedFile: File =null;
  showSuccessMessage: boolean;
  closeResult: string;
  constructor(public customerService: CustomerService,private modalService: NgbModal) {
    this.showSuccessMessage = false;
  }
  submitted: boolean;

  formControls = this.customerService.form.controls;

  ngOnInit() {
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }


  open(content) {

    console.log(content);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.customerService.form.valid) {
      if (this.customerService.form.get('$key').value == null){
        this.customerService.insertCustomer(this.customerService.form.value, this.selectedFile);
        this.showSuccessMessage = true;
        // open('content');
        setTimeout(() => this.showSuccessMessage = false, 20000);
      }

      else
      {
        this.customerService.updateCustomer(this.customerService.form.value);
        this.showSuccessMessage = true;

        setTimeout(() => this.showSuccessMessage = false, 3000);
        this.submitted = false;
        this.customerService.form.reset();
        //this is to be done for proper reset operation
        this.customerService.form.setValue({
          $key: null,
          fullName: '',
          email: '',
          mobile: '',
          location: ''
        });
      }

    }
  }

}
