import { TextTypes, Note } from './note';

export let NOTES_MOCK: Note[] = [
  {
    id: "1",
    title: 'Dependency Injection in Angular',
    created: new Date('January 17, 2019 03:24:00'),
    modified: new Date('January 17, 2019 04:25:00'),
    tags: ['angular', 'dependency injection', 'javascript'],
    fav: false,
    content: [
      {
        text: 'This is dependency injection in Angular',
        type: TextTypes.TEXT
      },
      {
        text: 'https://angular.io',
        type: TextTypes.LINK
      },
      {
        text: `import { async, ComponentFixture, TestBed } from '@angular/core/testing';

        import { CodeSnippetComponent } from './code-snippet.component';
        
        import { AngularMaterialModule } from "../angular-material/angular-material.module";
        import { HttpClientModule } from '@angular/common/http';
        
        describe('CodeSnippetComponent', () => {
          let component: CodeSnippetComponent;
          let fixture: ComponentFixture;
        
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
        });`,
        type: TextTypes.CODE
      }
    ]
  },
  {
    id: "2",
    title: 'CSS Flex Sample',
    created: new Date('December 17, 2018 03:24:00'),
    modified: new Date('December 18, 2018 03:24:00'),
    tags: ['css', 'flexbox '],
    fav: false,
    content: [
      {
        text: 'This is CSS FlexBox',
        type: TextTypes.TEXT
      },
      {
        text: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
        type: TextTypes.LINK
      },
      {
        text: `.example-angle {
            transform: rotate(10deg);
          }
          .example-color {
            color: rgba(255, 0, 0, 0.2);
            background: purple;
            border: 1px solid hsl(100, 70%, 40%);
          }
          .example-easing {
            transition-timing-function: linear;
          }
          .example-time {
            transition-duration: 3s;
          }`,
        type: TextTypes.CODE
      }
    ]
  }
];
