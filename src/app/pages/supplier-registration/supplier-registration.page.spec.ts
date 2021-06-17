import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SupplierRegistrationPage } from './supplier-registration.page';

describe('SupplierRegistrationPage', () => {
  let component: SupplierRegistrationPage;
  let fixture: ComponentFixture<SupplierRegistrationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierRegistrationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
