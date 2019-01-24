import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';


import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  imagePathy = '';
  customerList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) {
    this.customerList = this.firebase.list('customers');
  }


  form = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(7)]),
    location: new FormControl(''),
    image: new FormControl(''),
    Title: new FormControl(''),
    DOB: new FormControl(''),
    Nationality: new FormControl(''),
    Qualification: new FormControl(''),
    Gender: new FormControl(''),



  });


  getCustomers() {
    this.customerList = this.firebase.list('customers');
    return this.customerList.snapshotChanges();
  }


  insertCustomer(customer, selected) {

    console.log(selected.name);
    this.customerList = this.firebase.list('customers');
    const storageRef: firebase.storage.Reference = firebase.storage().ref('/photos/imgs');
    storageRef.put(selected).on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        //upload in progress

        // snapshot.ref.getDownloadURL().then(function(downloadURL) {
        //   console.log('File available at', downloadURL);
        //   localStorage.setItem('downloadURL', downloadURL);
        //   // let progress = (snapshot.bytesTransferred/ snapshot.totalBytes)/100;
        //   // console.log(progress);
        //
        // });
        localStorage.setItem('downloadURL', "dummypath");
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        //upload.url = uploadTask.snapshot.downloadURL
        //upload.name = upload.file.name
        //this.saveFileData(upload)
        this.customerList.push({
          fullName: customer.fullName,
          email: customer.email,
          mobile: customer.mobile,
          location: customer.location,
          image: selected.name,
          Title: customer.Title,
          DOB: customer.DOB,
          Nationality: customer.Nationality,
          Qualification : customer.Qualification,
          Gender: customer.Gender



        });
      }
    );



  }

  populateForm(customer) {
    this.form.setValue(customer);
  }

  updateCustomer(customer) {
    this.customerList.update(customer.$key,
      {
        fullName: customer.fullName,
        email: customer.email,
        mobile: customer.mobile,
        location: customer.location
      });
  }

  deleteCustomer($key: string) {
    this.customerList.remove($key);
  }

}
