import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDistribuidorComponent } from './new-distribuidor.component';

describe('NewDistribuidorComponent', () => {
  let component: NewDistribuidorComponent;
  let fixture: ComponentFixture<NewDistribuidorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDistribuidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDistribuidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
