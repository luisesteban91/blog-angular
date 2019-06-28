import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuidorDetailComponent } from './distribuidor-detail.component';

describe('DistribuidorDetailComponent', () => {
  let component: DistribuidorDetailComponent;
  let fixture: ComponentFixture<DistribuidorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistribuidorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribuidorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
