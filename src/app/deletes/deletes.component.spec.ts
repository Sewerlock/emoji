import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletesComponent } from './deletes.component';

describe('DeletesComponent', () => {
  let component: DeletesComponent;
  let fixture: ComponentFixture<DeletesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
