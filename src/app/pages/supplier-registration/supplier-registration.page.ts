import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { AccessProviders } from './../../providers/access-providers';

@Component({
  selector: 'app-supplier-registration',
  templateUrl: './supplier-registration.page.html',
  styleUrls: ['./supplier-registration.page.scss'],
})
export class SupplierRegistrationPage implements OnInit {
  identity_number: string = '';
  firstname: string = '';
  surname: string = '';
  username: string = '';
  gender: string = '';
  date_of_birth: string = '';
  email_address: string = '';
  physical_address: string = '';
  phone_number: string = '';
  password: string = '';
  confirm_pass: string = '';

  disabledButton;
  alertController: any;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.disabledButton = false;
  }

  async tryRegister() {
    if (this.identity_number == '') {
      this.presentToast('Identity Number  Is Required');
    } else if (this.firstname == '') {
      this.presentToast('First Name  Is Required');
    } else if (this.surname == '') {
      this.presentToast('Surname Is Required');
    } else if (this.username == '') {
      this.presentToast('Username Is Required');
    } else if (this.gender == '') {
      this.presentToast('Gender Is Required');
    } else if (this.date_of_birth == '') {
      this.presentToast('Date of Birth is required');
    } else if (this.email_address == '') {
      this.presentToast('Email is required');
    } else if (this.physical_address == '') {
      this.presentToast('Physical Address is required');
    } else if (this.phone_number == '') {
      this.presentToast('Phone Number is required');
    } else if (this.password == '') {
      this.presentToast('Password is required');
    } else if (this.confirm_pass != this.password) {
      this.presentToast('Passwords Not The Same');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait......',
      });

      loader.present();

      return new Promise((resolve) => {
        let body = {
          aksi: 'proses_supplier_register',
          identity_number: this.identity_number,
          firstname: this.firstname,
          surname: this.surname,
          username: this.username,
          gender: this.gender,
          date_of_birth: this.date_of_birth,
          email_address: this.email_address,
          physical_address: this.physical_address,
          phone_number: this.phone_number,
          password: this.password,
        };
        this.accsPrvds.postData(body, 'proses_api.php').subscribe(
          (res: any) => {
            if (res.success) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              console.log(res.body);
              this.router.navigate(['/login']);
            } else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
            }
          },
          (error) => {
            resolve({ success: false });
            loader.dismiss();
            this.disabledButton = false;
            this.presentAlert('Timeout');
            console.log(body);
          }
          // (err) => {
          //   loader.dismiss();
          //   this.disabledButton = false;
          //   this.presentAlert('Timeout');
          //   console.log(body);
          // }
        );
      });
    }
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top',
    });

    toast.present();
  }

  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',

          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            //action
          },
        },
        {
          text: 'Try Again',
          handler: () => {
            this.tryRegister();
          },
        },
      ],
    });

    await alert.present();
  }

  openLogin() {
    this.router.navigate(['/login']);
  }
}
