import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLayoutFooterComponent } from './profile-layout-footer.component';

describe('ProfileLayoutFooterComponent', () => {
  let component: ProfileLayoutFooterComponent;
  let fixture: ComponentFixture<ProfileLayoutFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileLayoutFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLayoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
