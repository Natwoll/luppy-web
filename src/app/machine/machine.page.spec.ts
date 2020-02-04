import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MachinePage } from './machine.page';

describe('MachinePage', () => {
  let component: MachinePage;
  let fixture: ComponentFixture<MachinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MachinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
