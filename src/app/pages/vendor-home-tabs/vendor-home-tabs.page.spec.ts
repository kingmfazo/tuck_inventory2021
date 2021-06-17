import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorHomeTabsPage } from './vendor-home-tabs.page';

describe('VendorHomeTabsPage', () => {
  let component: VendorHomeTabsPage;
  let fixture: ComponentFixture<VendorHomeTabsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorHomeTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorHomeTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
