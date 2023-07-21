import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRegisterComponent } from './delete-register.component';

describe('DeleteRegisterComponent', () => {
  let component: DeleteRegisterComponent;
  let fixture: ComponentFixture<DeleteRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
