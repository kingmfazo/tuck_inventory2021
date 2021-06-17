import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-inv-more-modal',
  templateUrl: './inv-more-modal.component.html',
  styleUrls: ['./inv-more-modal.component.scss'],
})
export class InvMoreModalComponent  {

  passedId=null;
  constructor(
    private modalCtrl: ModalController,private navParams:NavParams
  ) { }

  dismissModal(){
 this.modalCtrl.dismiss();
  }

}
