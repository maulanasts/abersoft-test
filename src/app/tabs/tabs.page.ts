import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateUserPage } from '../create-user/create-user.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public modalController: ModalController,
  ) { }

  async showModal() {
    const modal = await this.modalController.create({
      component: CreateUserPage,
    });
    return await modal.present();
  }
}
