import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvMoreinfoModalPage } from './inv-moreinfo-modal.page';

describe('InvMoreinfoModalPage', () => {
  let component: InvMoreinfoModalPage;
  let fixture: ComponentFixture<InvMoreinfoModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvMoreinfoModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvMoreinfoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
