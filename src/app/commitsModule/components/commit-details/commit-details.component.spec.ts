import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitDetailsComponent } from './commit-details.component';

describe('CommitDetailsComponent', () => {
  let component: CommitDetailsComponent;
  let fixture: ComponentFixture<CommitDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommitDetailsComponent]
    });
    fixture = TestBed.createComponent(CommitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
