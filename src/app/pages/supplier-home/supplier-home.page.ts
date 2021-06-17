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
import { ApproveStockPage } from '../approve-stock/approve-stock.page';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-supplier-home',
  templateUrl: './supplier-home.page.html',
  styleUrls: ['./supplier-home.page.scss'],
})
export class SupplierHomePage implements OnInit {
  orders: any = [];
  start: number = 0;
  limit: number = 13;

  slideOpts = {
    initialSlide: 0,
    spaceBetween: 0,
    slidesPerView: 'auto',
  };

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {}

  ionViewDidEnter() {
    this.start = 0;
    this.orders = [];
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
        aksi: 'propes_loadOrders',
        start: this.start,
        limit: this.limit,
      };
      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
        for (let datas of res.result) {
          this.orders.push(datas);
          console.log(datas);
        }
        resolve(true);
      });
    });
  }

  //Modal

  async openModal(order) {
    const modal = await this.modalCtrl.create({
      component: ApproveStockPage,
      swipeToClose: true,
      componentProps: {
        Order_Id: order.Order_Id,
        OrderDetail_Id: order.OrderDetail_Id,
        Vendor_Id: order.Vendor_Id,
        Product_Id: order.Product_Id,
        Product_Name: order.Product_Name,
        PAddress: order.PAddress,
        Contact: order.Contact,
        Unit_Price: order.Unit_Price,
        Quantity: order.Quantity,
        Total_Price: order.Total_Price,
        Order_Date: order.Order_Date,
        Delivery_Date: order.Delivery_Date,
      },
    });

    await modal.present();
  }

  //Modal Ends
}
