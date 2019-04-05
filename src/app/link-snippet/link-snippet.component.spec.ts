import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkSnippetComponent } from './link-snippet.component';

describe('LinkSnippetComponent', () => {
  let component: LinkSnippetComponent;
  let fixture: ComponentFixture<LinkSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkSnippetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
