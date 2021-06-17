import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  FormsModule,
} from '@angular/forms';
import { AccessProviders } from './../../providers/access-providers';

@Component({
  selector: 'app-approve-stock',
  templateUrl: './approve-stock.page.html',
  styleUrls: ['./approve-stock.page.scss'],
})
export class ApproveStockPage implements OnInit {
  Order_Id: string = '';
  Product_Id: string = '';
  Quantity: string = '';
  Total_Price: string = '';
  Delivery_Date: string = '';

  disabledButton;
  alertController: any;
  suppliers: any = [];

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.disabledButton = false;
  }

  //Insert Function
  async tryRegister() {
    if (this.Product_Id == '') {
      this.presentToast('Barcode  Is Required');
    } else if (this.Order_Id == '') {
      this.presentToast('Order_Id Is Required');
    } else if (this.Quantity == '') {
      this.presentToast('Quantity Is Required');
    } else if (this.Total_Price == '') {
      this.presentToast('Price Is Required');
    } else if (this.Delivery_Date == '') {
      this.presentToast('Cash In handed is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait......',
      });

      loader.present();

      return new Promise((resolve) => {
        let body = {
          aksi: 'proses_approveStock',
          Order_Id: this.Order_Id,
          Product_Id: this.Product_Id,
          Quantity: this.Quantity,
          Total_Price: this.Total_Price,
          Delivery_Date: this.Delivery_Date,
        };
        this.accsPrvds.postData(body, 'proses_api.php').subscribe(
          (res: any) => {
            if (res.success) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              console.log(res.body);
              this.router.navigate(['/supplier-tabs']);
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

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
