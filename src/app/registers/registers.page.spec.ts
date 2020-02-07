import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Registers } from './registers.page';

describe('Registers', () => {
  let component: Registers;
  let fixture: ComponentFixture<Registers>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Registers],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Registers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
