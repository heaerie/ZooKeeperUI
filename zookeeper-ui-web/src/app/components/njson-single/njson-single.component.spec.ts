import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NjsonSingleComponent } from './njson-single.component';

describe('NjsonSingleComponent', () => {
  let component: NjsonSingleComponent;
  let fixture: ComponentFixture<NjsonSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NjsonSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NjsonSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
