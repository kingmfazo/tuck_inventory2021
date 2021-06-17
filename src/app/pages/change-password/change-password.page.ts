import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AccessProviders } from './../../providers/access-providers';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  newPassword: string = '';
  newPassword2: string = '';
  appstoreData: any;
  email: string;

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

  ionViewDidEnter() {
    this.storage.get('smek_db').then((res) => {
      console.log(res);
      this.appstoreData = res;
      this.email = this.appstoreData.email;
    });
  }
  async changePass() {
    if (this.newPassword == '') {
      this.presentToast('Password is Required');
    } else if (this.newPassword2 != this.newPassword) {
      this.presentToast('Passwords Do Not Match');
    } else if (this.newPassword2 == '') {
      this.presentToast('Confirmation Password Required');
    } else {
      //this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait......',
      });

      loader.present();

      return new Promise((resolve) => {
        this.ionViewDidEnter();
        let body = {
          aksi: 'change-pass',
          newPassword: this.newPassword,
          newPassword2: this.newPassword2,
          email: this.appstoreData.email,
        };
        this.accsPrvds.postData(body, 'proses_api.php').subscribe(
          (res: any) => {
            if (res.success) {
              loader.dismiss();
              this.storage.remove(res.result);
              this.navCtrl.navigateRoot(['/login']);
              this.presentToast('Password Changed');
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
