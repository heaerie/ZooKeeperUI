import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NjsonComponent } from './njson.component';

describe('NjsonComponent', () => {
  let component: NjsonComponent;
  let fixture: ComponentFixture<NjsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NjsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NjsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
