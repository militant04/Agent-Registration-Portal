import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import {AngularFireAuth} from "@angular/fire/auth"
import {Router} from '@angular/router';
import { HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(public customerService: CustomerService,
              private router: Router,private http: HttpClient,
              public afAuth: AngularFireAuth,) {
  }

  customerArray = [];
  showDeletedMessage: boolean;
  searchText: string = "";
  error: boolean;
  showEmailOpening : boolean;
  loginMessage =null;
  body:any;
  imagee = localStorage.getItem('imagee');

  ngOnInit() {

 document.getElementById('footer').style.display = 'none';
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
  DownloadDoc(){
    window.location.href ="http://multimodal.co.zw/docs/AgentFolder.rar";
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



  sendEmail(email,emailbody){
    this.http.post("http://multimodal.co.zw/api/mail.php" , {"body":emailbody,"email": email})
      .subscribe(data =>{
        console.log(data);

      })
  }

  onDecline(){

    let username1 = (<HTMLInputElement>document.getElementById('email')).value;
    let domain = username1.substring(username1.lastIndexOf("@") +1);

    if(domain == "gmail.com"){

      setTimeout(() => this.showEmailOpening =true, 4000);
      window.location.href = "mailto:"+username1+"?subject=Unfortunately rejected&body=Your request to be an agent has been rejected";

    }
    else{
      alert("This agent has been declined and email will be sent to them shortly");
      this.sendEmail(username1, "We regret to inform you that you request has been rejected at this time");
    }
  }

  generateEmailPassword(customer) {


    let username1 = (<HTMLInputElement>document.getElementById('email')).value;
    let domain = username1.substring(username1.lastIndexOf("@") +1);

    console.log(domain);
    try{
      const result = this.afAuth.auth.createUserWithEmailAndPassword(username1,'XC@#%uopiyZA)(')
        .then(auth => {
          this.showEmailOpening = true;
          setTimeout(() => this.showEmailOpening = false, 3000);

          if(domain == "gmail.com"){
            window.location.href = "mailto:"+username1+"?subject=credentials&body=username:  "+username1+"%20  password:  XC@#%uopiyZA)(";

          }
          else{

            this.sendEmail(username1, "password: XC@#%uopiyZA)("+"  "+"use your registered email as your username");
          }

        })
        .catch(err => {
          // console.log(err.code);
          // this.loginMessage =err.message;
          // setTimeout(() => this.loginMessage = null, 3000);

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
