import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountStatementInfoComponent } from './account-statement-info.component';

describe('AccountStatementInfoComponent', () => {
  let component: AccountStatementInfoComponent;
  let fixture: ComponentFixture<AccountStatementInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountStatementInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountStatementInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
