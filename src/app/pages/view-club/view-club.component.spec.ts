import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClubComponent } from './view-club.component';

describe('ViewClubComponent', () => {
  let component: ViewClubComponent;
  let fixture: ComponentFixture<ViewClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
