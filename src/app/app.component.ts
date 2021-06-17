import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private storage: Storage,
    public navCtrl: NavController
  ) {
    this.initializeApp();
  }

  ngOnInit() {}

  // async ngOnInit() {
  //   await this.storage.create();
  // }

  initializeApp() {
    this.storage.create();
    this.storage.get('smek_db').then((res) => {
      if (res == null) {
        // this.navCtrl.navigateRoot('/login');
      } else {
        //this.navCtrl.navigateRoot('/home');
      }
    });
  }
}
