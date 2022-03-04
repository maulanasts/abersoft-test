import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  users: any = [];
  page: number = 1;

  constructor(
    public http: HttpClient,
    public router: Router,
  ) { }

  ionViewDidEnter() {
    this.load_data(null);
  }

  load_data(ev_infi) {
    let url = 'https://reqres.in/api/users?page=' + this.page;

    this.http.get(url).subscribe((res: any) => {

      if (res) {
        for (var i = 0; i < res.data.length; i++) {
          this.users.push(res.data[i]);
        }

        this.page += 1;

        // if(this.page== res.total_pages){
        if (ev_infi) { ev_infi.target.complete() };
        // }
      } else {
        this.users = [];
      }

    }, error => {
      console.error(error);
    });
  }

  async detail(val) {
    let params = {
      queryParams: {
        id: val.id,
        email: val.email,
        first_name: val.first_name,
        last_name: val.last_name,
        avatar: val.avatar,
      }
    };

    this.router.navigate(['/tabs/tab1/view-user'], params);
  }

}
