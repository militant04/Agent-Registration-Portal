import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Agent';
  username =localStorage.getItem('username');
  constructor(){
    this.setUserNAme();
  }

  setUserNAme(){
    try{
      this.username = localStorage.getItem('username');
    }
    catch (err){

    }
  }
}
