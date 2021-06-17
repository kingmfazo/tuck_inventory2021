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
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.page.html',
  styleUrls: ['./pending-orders.page.scss'],
})
export class PendingOrdersPage implements OnInit {
  orders: any = [];
  start: number = 0;
  limit: number = 13;
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
        aksi: 'propes_ordersPend',
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
}
