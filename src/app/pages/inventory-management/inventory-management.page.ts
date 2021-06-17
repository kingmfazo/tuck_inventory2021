import { InvMoreModalComponent } from './../inv-more-modal/inv-more-modal.component';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastController,
  LoadingController,
  AlertController,
  NavController,
  ModalController,
} from '@ionic/angular';
import { AccessProviders } from './../../providers/access-providers';
//import { Storage } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.page.html',
  styleUrls: ['./inventory-management.page.scss'],
})
export class InventoryManagementPage implements OnInit {
  products: any = [];
  start: number = 0;
  limit: number = 13;

  @Input() Barcode: string;
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    public navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.start = 0;
    this.products = [];
    this.loadProducts();
  }

  async doRefresh(event) {
    const loader = await this.loadingCtrl.create({
      message: 'Please wait......',
    });

    loader.present();
    this.ionViewDidEnter();
    event.target.complete();
    loader.dismiss();
  }

  loadData(event) {
    this.start += this.limit;
    setTimeout(() => {
      this.loadProducts().then(() => {
        event.target.complete();
      });
    }, 500);
  }

  async loadProducts() {
    return new Promise((resolve) => {
      let body = {
        aksi: 'propes_loadData',
        start: this.start,
        limit: this.limit,
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

  async delData(a) {
    return new Promise((resolve) => {
      let body = {
        aksi: 'propes_delProduct',
        id: a,
      };
      this.accsPrvds.postData(body, 'proses_api.php').subscribe(
        (res: any) => {
          if (res.success) {
            this.presentToast('Product Deleted Successfully');
          } else {
            this.presentToast('Delete Error');
          }
        }
        /* (err) => {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Timeout');
          } */
      );
    });
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
    });

    toast.present();
  }

  // open reg page
  openRegister() {
    this.router.navigate(['/register']);
  }

  openAdd() {
    this.router.navigate(['/product-add']);
  }
  //Modal

  async openModal(product) {
    const modal = await this.modalCtrl.create({
      component: InvMoreModalComponent,
      swipeToClose: true,
      componentProps: {
        Barcode: product.Barcode,
        Product_Name: product.Product_Name,
        Price: product.Purchase_Prize,
        Quantity: product.Quantity,
        Product_Size: product.Product_Size,
        Product_Color: product.Product_Color,
        Stock_Alert: product.Stock_Alert,
        Description: product.Description,
      },
    });

    await modal.present();
  }

  //Modal Ends
}
