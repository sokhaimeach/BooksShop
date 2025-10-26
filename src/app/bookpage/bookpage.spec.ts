import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookpage } from './bookpage';

describe('Bookpage', () => {
  let component: Bookpage;
  let fixture: ComponentFixture<Bookpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
