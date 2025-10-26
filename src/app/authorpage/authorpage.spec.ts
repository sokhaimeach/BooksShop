import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Authorpage } from './authorpage';

describe('Authorpage', () => {
  let component: Authorpage;
  let fixture: ComponentFixture<Authorpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Authorpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Authorpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
