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

@Component({
  selector: 'app-enter-sales',
  templateUrl: './enter-sales.page.html',
  styleUrls: ['./enter-sales.page.scss'],
})
export class EnterSalesPage implements OnInit {
  barcode: string = '';
  A_barcode: string = '';
  product_name: string = '';

  product_size: string = '';

  quantity: number;
  cash: number;
  vendor_id: string = '';

  disabledButton;
  alertController: any;
  products: any = [];
  details: any = [];

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.disabledButton = false;
    this.products = [];
    this.details = [];
  }

  //Select click function
  // loadSups() {
  //   this.loadProducts();
  // }

  //Load Function
  searchProds($event) {
    console.log(event);
    this.loadProducts();
    this.search();
  }
  async loadProducts() {
    return new Promise((resolve) => {
      let body = {
        aksi: 'searchProducts',

        // start: this.start,
        // limit: this.limit,
      };
      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
        for (let datas of res.result) {
          this.products.push(datas);
          console.log(datas);
        }

        resolve(true);
      });
    });
  }

  async search() {
    return new Promise((resolve) => {
      let body = {
        aksi: 'searchDetails',
        barcode: this.barcode,
        // start: this.start,
        // limit: this.limit,
      };
      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
        for (let datas of res.result) {
          this.products.push(datas);
          console.log(datas.Barcode);
          this.product_name = datas.Product_Name;
          this.cash = datas.Purchase_Prize;
          this.quantity = datas.Quantity;
          this.product_size = datas.Product_Size;
          this.cash = datas.Purchase_Prize;
          this.A_barcode = datas.Barcode;
        }
        // if(res.success){
        //   console.log(res.result.Product_Name);
        // }
        resolve(true);
      });
    });
  }

  //Insert Function
  async tryRegister() {
    if (this.barcode == '') {
      this.presentToast('Barcode  Is Required');
    } else if (this.product_name == '') {
      this.presentToast('Product  Name  Is Required');
    } else if (this.product_size == '') {
      this.presentToast('Product Size Is Required');
    } else if (this.quantity === null) {
      this.presentToast('Quantity Is Required');
    } else if (this.cash === null) {
      this.presentToast('Cash In handed is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait......',
      });

      loader.present();

      return new Promise((resolve) => {
        let body = {
          aksi: 'proses_enterSales',
          A_barcode: this.A_barcode,
          product_name: this.product_name,

          product_size: this.product_size,
          quantity: this.quantity,
          cash: this.cash,
        };
        this.accsPrvds.postData(body, 'proses_api.php').subscribe(
          (res: any) => {
            if (res.success) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              console.log(res.body);
              this.router.navigate([
                '/vendor-home-tabs/tabs/inventory-management',
              ]);
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
