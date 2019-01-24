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
  }

}
