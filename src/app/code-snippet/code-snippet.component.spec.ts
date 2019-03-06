import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSnippetComponent } from './code-snippet.component';

import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { HttpClientModule } from '@angular/common/http';

describe('CodeSnippetComponent', () => {
  let component: CodeSnippetComponent;
  let fixture: ComponentFixture<CodeSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[AngularMaterialModule, HttpClientModule],
      declarations: [ CodeSnippetComponent ],
      providers: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
