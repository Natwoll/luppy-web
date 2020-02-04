import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Scan } from './scan.page';

describe('Tab1Page', () => {
  let component: Scan;
  let fixture: ComponentFixture<Scan>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Scan],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Scan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
