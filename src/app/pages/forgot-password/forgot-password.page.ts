import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastController,
  LoadingController,
  AlertController,
  NavController,
} from '@ionic/angular';
import { AccessProviders } from './../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email_address: string;
  temp_email: string;
  datastorage: any;
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    public navCtrl: NavController
  ) {}

  ngOnInit() {}

  async writeFile() {
    // setItem(storageRef: string, value: any)
    //this.storage.set('storage_xxx', res.result);
    console.log(this.temp_email);
  }

  async tryForgotPass() {
    if (this.email_address == '') {
      this.presentToast('Email is required');
    } else {
      //this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait......',
      });

      loader.present();

      return new Promise((resolve) => {
        let body = {
          aksi: 'forgot-pass',
          email_address: this.email_address,
        };
        this.accsPrvds.postData(body, 'proses_api.php').subscribe(
          (res: any) => {
            if (res.success) {
              this.writeFile();
              loader.dismiss();
              this.presentToast('Verified');
              this.temp_email = this.email_address;
              this.storage.set('smek_db', res.result); //Create Storage Session
              this.navCtrl.navigateRoot(['/change-password']);
            } else {
              loader.dismiss();
              this.presentToast(res.msg);
            }
          },
          (err) => {
            loader.dismiss();

            this.presentToast('Timeout Error...');
          }
        );
      });
    }
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
    });

    toast.present();
  }
}
