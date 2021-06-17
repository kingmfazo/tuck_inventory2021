import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { AccessProviders } from './../../providers/access-providers';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {
  barcode: string = '';
  product_name: string = '';
  product_color: string = '';
  product_size: string = '';
  description: string = '';
  quantity: string = '';
  purchase_prize: string = '';
  stock_alert: string = '';

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

  async addProduct() {
    if (this.barcode == '') {
      this.presentToast('Barcode  Is Required');
    } else if (this.product_name == '') {
      this.presentToast('Product Name  Is Required');
    } else if (this.product_color == '') {
      this.presentToast('Color Is Required');
    } else if (this.product_size == '') {
      this.presentToast('Size Is Required');
    } else if (this.description == '') {
      this.presentToast('Desc Is Required');
    } else if (this.quantity == '') {
      this.presentToast('Quantity is required');
    } else if (this.purchase_prize == '') {
      this.presentToast('Price is required');
    } else if (this.stock_alert == '') {
      this.presentToast('Alert is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait......',
      });

      loader.present();

      return new Promise((resolve) => {
        let body = {
          aksi: 'proses_addProduct',
          barcode: this.barcode,
          product_name: this.product_name,
          product_color: this.product_color,
          product_size: this.product_size,
          description: this.description,
          quantity: this.quantity,
          purchase_prize: this.purchase_prize,
          stock_alert: this.stock_alert,
        };
        this.accsPrvds.postData(body, 'proses_api.php').subscribe(
          (res: any) => {
            if (res.success) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              console.log(res.body);
              this.router.navigate(['/tabs/home']);
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
            this.addProduct();
          },
        },
      ],
    });

    await alert.present();
  }
}
