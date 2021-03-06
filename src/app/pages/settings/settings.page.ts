import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(private renderer:Renderer2) {}

  ngOnInit() {}
  onToggleColorTheme(event) {
    console.log(event.detail.checked);

    if (event.detail.checked) {
     // document.body.setAttribute();
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    }
    else{
       this.renderer.setAttribute(document.body, 'color-theme', 'light');
      //document.body.setAttribute('color-theme', 'light');
    }
  }
}
