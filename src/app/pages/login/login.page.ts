import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastController,
  LoadingController,
  AlertController,
  NavController,
} from '@ionic/angular';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  FormsModule,
} from '@angular/forms';
import { AccessProviders } from './../../providers/access-providers';
//import { Storage } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email_address: string = '';

  password: string = '';

  disabledButton;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    public navCtrl: NavController
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }

  async tryLogin() {
    if (this.email_address == '') {
      this.presentToast('Email is required');
    } else if (this.password == '') {
      this.presentToast('Password is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait......',
      });

      loader.present();

      return new Promise((resolve) => {
        let body = {
          aksi: 'proses_login',
          email_address: this.email_address,
          password: this.password,
        };
        this.accsPrvds.postData(body, 'proses_api.php').subscribe(
          (res: any) => {
            if (res.success) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Login Success');
              if (res.result.statusId == 1) {
                this.storage.set('smek_db', res.result); //Create Storage Session
                this.navCtrl.navigateRoot(['/vendor-home-tabs']);
                console.log(res.result.statusId);
              } else if (res.result.statusId == 0) {
                this.storage.set('smek_db', res.result); //Create Storage Session
                this.navCtrl.navigateRoot(['/supplier-tabs']);
                console.log(res.result.statusId);
              }
            } else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Email or Password Not Correct');
            }
          },
          // (err) => {
          //     loader.dismiss();
          //     this.disabledButton = false;
          //     this.presentToast('Login Failed');
          //   }
          async (res) => {
            loader.dismiss();
            this.disabledButton = false;
            const alert = await this.alertCtrl.create({
              header: 'Login Failed',
              message: res.error.error,
              buttons: ['OK'],
            });
            await alert.present();
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

  openRegister() {
    this.router.navigate(['/register']);
  }
   forgotPass() {
    this.router.navigate(['/forgot-password']);
  }
}
