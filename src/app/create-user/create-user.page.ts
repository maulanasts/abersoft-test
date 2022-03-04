import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {

  myForm: FormGroup;
  isSubmitted: boolean;

  constructor(
    public alertController: AlertController,
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

        const alert = await this.alertController.create({
          header: 'Success',
          message: JSON.stringify(res),
          buttons: ['OK']
        });

        await alert.present();

      }, error => {
        console.error(error);
      });
    }
  }

}
