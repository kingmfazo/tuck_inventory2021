import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-inv-moreinfo-modal',
  templateUrl: './inv-moreinfo-modal.page.html',
  styleUrls: ['./inv-moreinfo-modal.page.scss'],
})
export class InvMoreinfoModalPage implements OnInit {
  passedId = null;
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.passedId = this.navParams.get('account_id');
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
