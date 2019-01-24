import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth"
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn : boolean;
  loginMessage =null;
  signin = 'Sign In';

  user = {"username": "","password": ""};
  constructor(public afAuth: AngularFireAuth, private router: Router){
    this.loggedIn = false;
  }
  title = 'app';
  ngOnInit() {

  }

  async signup(){

    try{

      this.signin = '.....Signing In';

      console.log('username'+this.user.username);
      const result = this.afAuth.auth.signInWithEmailAndPassword(this.user.username,this.user.password)
        .then(auth => {
          this.loggedIn =true;
          localStorage.setItem('username', this.user.username);
          if(this.user.username = 'militant@gmailcom'|| 'admin@gmail.com'){
            this.router.navigateByUrl('admin');
          }
          else{
            this.loginMessage ="This user is registered in the system without Amin previledges";
          }

        })
        .catch(err => {
          console.log(err.code);

          this.loginMessage =err.message;
          this.signin = 'Try Sign In Again'

        });
      console.log(result);


    }
    catch (error){
      console.log(error);
      // loading.dismiss();
    }



  }

}
