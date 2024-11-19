import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcManagementComponent } from './abc-management.component';

describe('AbcManagementComponent', () => {
  let component: AbcManagementComponent;
  let fixture: ComponentFixture<AbcManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbcManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbcManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
