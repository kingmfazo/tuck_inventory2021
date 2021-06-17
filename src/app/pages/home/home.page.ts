import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastController,
  LoadingController,
  AlertController,
  NavController,
} from '@ionic/angular';
import { AccessProviders } from './../../providers/access-providers';
//import { Storage } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  appDataStore: any;
  username: string;
  @ViewChild('barCanvas') public barCanvas: ElementRef;
  barChart: any;
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    public navCtrl: NavController
  ) {}

  ngOnInit() {}

  logOut() {
    this.storage.clear();

    this.router.navigate(['/login']);
  }

  ionViewDidEnter() {
    this.storage.get('smek_db').then((res) => {
      this.appDataStore = res;
      this.username = this.appDataStore.username;
    });

    //Chart
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Rice', 'Sugar', 'Coke', 'Fish', 'Bread', 'Oranges'],
        datasets: [
          {
            label: '# of products',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
