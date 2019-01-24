import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import {AngularFireAuth} from "@angular/fire/auth"
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(public customerService: CustomerService,
              private router: Router,
              public afAuth: AngularFireAuth,) {
  }

  customerArray = [];
  showDeletedMessage: boolean;
  searchText: string = "";
  error: boolean;
  showEmailOpening : boolean;
  loginMessage =null;

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      list => {
        this.customerArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });

    setTimeout(() => this.error = true, 3000);
  }

  onDelete($key) {
    if (confirm('Are you sure to delete this record ?')) {
      this.customerService.deleteCustomer($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }

  filterCondition(customer) {
    return customer.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }


  generateEmailPassword(customer) {


    let username1 = (<HTMLInputElement>document.getElementById('email')).value;
    try{
      const result = this.afAuth.auth.createUserWithEmailAndPassword(username1,'XC@#%uopiyZA)(')
        .then(auth => {
          this.showEmailOpening = true;
          setTimeout(() => this.showEmailOpening = false, 3000);
          window.location.href = "mailto:"+username1+"?subject=credentials&body=username:  "+username1+"%20  password:  XC@#%uopiyZA)(";
        })
        .catch(err => {
          console.log(err.code);
          this.loginMessage =err.message;
          setTimeout(() => this.loginMessage = null, 3000);

          //alert(err.message);

        });
      console.log(result);

    }
    catch (error){
      console.log(error);
      this.loginMessage =error.message;

    }

  }

}
