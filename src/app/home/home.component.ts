import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedFile: File =null;
  showSuccessMessage: boolean;
  constructor(public customerService: CustomerService) {
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

  onSubmit() {
    this.submitted = true;

    if (this.customerService.form.valid) {
      if (this.customerService.form.get('$key').value == null){
        this.customerService.insertCustomer(this.customerService.form.value, this.selectedFile);
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 10000);
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
