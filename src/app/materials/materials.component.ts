import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
   loggedInUser ='';
  constructor() {

    this.loggedInUser = localStorage.getItem('username')
  }

  ngOnInit() {
    let isEmpty = document.getElementById('youtube').innerHTML;
    if(isEmpty ==="" || " " || "   "){
      console.log('is empty')
    }
    else{
      console.log('is now not empty')
    }
  }

}
