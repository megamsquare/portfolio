import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLayoutHeaderComponent } from './profile-layout-header.component';

describe('ProfileLayoutHeaderComponent', () => {
  let component: ProfileLayoutHeaderComponent;
  let fixture: ComponentFixture<ProfileLayoutHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileLayoutHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLayoutHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
