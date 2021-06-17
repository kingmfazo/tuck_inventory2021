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
  selector: 'app-request-stock',
  templateUrl: './request-stock.page.html',
  styleUrls: ['./request-stock.page.scss'],
})
export class RequestStockPage implements OnInit {
  barcode: string = '';
  product_name: string = '';
  product_color: string = '';
  product_size: string = '';
  supplier: string = '';
  physical_address: string = '';
  phone_number: string = '';
  quantity: string = '';
  cash: string = '';
  vendor_id: string = '';

  disabledButton;
  alertController: any;
  suppliers: any = [];

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
    this.suppliers = [];
    this.loadProducts();
  }

  //Select click function
  // loadSups() {
  //   this.loadProducts();
  // }

  //Load Function

  async loadProducts() {
    return new Promise((resolve) => {
      let body = {
        aksi: 'searchSuppliers',
        // start: this.start,
        // limit: this.limit,
      };
      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
        for (let datas of res.result) {
          this.suppliers.push(datas);
          console.log(datas);
        }
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
    } else if (this.product_color == '') {
      this.presentToast('Product Colour Is Required');
    } else if (this.product_size == '') {
      this.presentToast('Product Size Is Required');
    } else if (this.quantity == '') {
      this.presentToast('Quantity Is Required');
    } else if (this.supplier == '') {
      this.presentToast('Supplier Choice Is Required');
    } else if (this.physical_address == '') {
      this.presentToast('Physical Address is required');
    } else if (this.cash == '') {
      this.presentToast('Cash In handed is required');
    } else if (this.vendor_id == '') {
      this.presentToast('Vendor Identity Number is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait......',
      });

      loader.present();

      return new Promise((resolve) => {
        let body = {
          aksi: 'proses_requestStock',
          barcode: this.barcode,
          product_name: this.product_name,
          product_color: this.product_color,
          product_size: this.product_size,
          quantity: this.quantity,
          supplier: this.supplier,
          physical_address: this.physical_address,
          phone_number: this.phone_number,
          cash: this.cash,
          vendor_id: this.vendor_id,
        };
        this.accsPrvds.postData(body, 'proses_api.php').subscribe(
          (res: any) => {
            if (res.success) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              console.log(res.body);
              this.router.navigate(['/vendor-tabs']);
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
