import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { History } from './history.page';

describe('Tab3Page', () => {
  let component: History;
  let fixture: ComponentFixture<History>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [History],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(History);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
