import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

import * as moment from 'moment';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {

  myForm: FormGroup;
  isSubmitted: boolean;

  post_result:string;

  constructor( 
    public http: HttpClient,
    public modalController: ModalController,
  ) {
    this.myForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', Validators.required),
      password_confirm: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  create() {
    this.isSubmitted = true;

    if (this.myForm.valid && this.myForm.get('password').value == this.myForm.get('password_confirm').value) {
      let url = 'https://reqres.in/api/users';
      let body = new FormData();
      body.append('first_name', this.myForm.get('first_name').value);
      body.append('last_name', this.myForm.get('last_name').value);
      body.append('email', this.myForm.get('email').value);
      body.append('password', this.myForm.get('password').value);

      this.http.post(url, body).subscribe(async (res: any) => {
        res.createdAt = moment(res.createdAt).format('YYYY-MM-DD HH:mm');
        this.post_result=JSON.stringify(res);
      }, error => {
        console.error(error);
      });
    }
  }

}
