import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  FormsModule,
} from '@angular/forms';


import { AccessProviders } from './../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {
  id: number;
  your_name: string = '';
  gender: string = '';
  date_of_birth: string = '';
  email_address: string = '';
  password: string = '';
  confirm_pass: string = '';

  disabledButton;
  alertController: any;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      console.log(data);
      this.id = data.id;
      this.your_name = data.your_name;
      this.gender = data.gender;
      this.date_of_birth = data.date_of_birth;
      this.email_address = data.email_address;
    });
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }

  async updateProfile() {
    if (this.id === null) {
      this.presentToast('Omang is Required');
    } else if (this.your_name == '') {
      this.presentToast('Your name is required');
    } else if (this.gender == '') {
      this.presentToast('Gender is required');
    } else if (this.date_of_birth == '') {
      this.presentToast('Date of Birth is required');
    } else if (this.email_address == '') {
      this.presentToast('Email is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait......',
      });

      loader.present();

      return new Promise((resolve) => {
        let body = {
          aksi: 'proses_editPatient',
          id: this.id,
          your_name: this.your_name,
          gender: this.gender,
          date_of_birth: this.date_of_birth,
          email_address: this.email_address,
        };
        this.accsPrvds.postData(body, 'proses_api.php').subscribe(
          (res: any) => {
            if (res.success) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Updated Succesfully');
              this.router.navigate(['admin-tabs/admin-patients']);
            } else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
            }
          },
          (err) => {
            loader.dismiss();
            this.disabledButton = false;
            this.presentAlert('Timeout');
          }
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
            this.updateProfile();
          },
        },
      ],
    });

    await alert.present();
  }
}
