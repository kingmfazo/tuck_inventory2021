import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastController,
  LoadingController,
  AlertController,
  NavController,
} from '@ionic/angular';
import { AccessProviders } from './../../providers/access-providers';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profiles: any = [];
  appStoreData: any;
  name: string;
  id: string;
  //username: string;
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    public navCtrl: NavController
  ) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.storage.get('smek_db').then((res) => {
      this.appStoreData = res;
      this.name = this.appStoreData.username;
      this.id = this.appStoreData.id;
      console.log(res.id);
      this.profiles = [];
      this.loadMyProfile();
    });
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
    setTimeout(() => {
      this.loadMyProfile().then(() => {
        event.target.complete();
      });
    }, 500);
  }

  async loadMyProfile() {
    return new Promise((resolve) => {
      let body = {
        aksi: 'propes_loadProfile',
        name: this.appStoreData.username,
        id: this.appStoreData.id,
      };
      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
        for (let datas of res.result) {
          this.profiles.push(datas);
          console.log(datas);
        }
        resolve(true);
      });
    });
  }

  editProfile(
    Identity_Number,
    Firstname,
    Surname,
    Email,
    Username,
    PhysicalAddress,
    Phone_Number
  ) {
    try {
      this.router.navigate([
        '/crud/' +
          Identity_Number +
          '/' +
          Firstname +
          '/' +
          Surname +
          '/' +
          Email +
          '/' +
          Username +
          '/' +
          PhysicalAddress +
          '/' +
          Phone_Number,
      ]);
      console.log('Id');
    } catch (e) {
      console.log(e);
    }
  }
}
