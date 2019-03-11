import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import hljs from 'highlight.js';

const placeholderText = '// Code goes here';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent implements OnInit, AfterViewInit {
  @ViewChild('snippet', { read: ElementRef }) snippet: ElementRef;
  @Input() code: string;

  @Input() editable: boolean = false;
  loading: boolean = true;
  constructor(private http: HttpClient) {}
  counter = 0;

  ngOnInit() {
    this.snippet.nativeElement.addEventListener('paste', function(e) {
      e.preventDefault();
      // get text representation of clipboard
      var text = (e.originalEvent || e).clipboardData.getData('text/plain');
      // insert text manually
      document.execCommand('insertHTML', false, text);
    });
  }

  ngAfterViewInit() {
    this.save(this.snippet.nativeElement);
  }

  toggleEditable(el) {
    this.editable = !this.editable;
  }

  selectAll(el) {
    this.placeCaretAtEnd(el);
  }

  placeCaretAtEnd(el) {
    let range = document.createRange();
    range.selectNodeContents(el);
    if (el.textContent !== placeholderText) range.collapse(false);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  onKeyDown(event) {
    if (event.key == 'Tab') {
      event.preventDefault();
      document.execCommand('insertHTML', false, '  ');
      /*       let range = document.getSelection().getRangeAt(0);
      let tabNode = document.createTextNode('  ');
      range.insertNode(tabNode);
      range.setStart(range.endContainer, range.endOffset); */
    } else if (event.ctrlKey && event.key === 's') {
      console.log('Ctrl+S!');
      event.preventDefault();
      this.save(event.target);
    }
  }

  onKeyUp(event) {}

  getCursor(node, preText: string, text: string) {
    if (node.nodeType == 3 || (<Element>node).tagName.toLowerCase() == 'br') {
      return { node: node, offset: preText.length - text.length };
    }
    let i = 0;
    for (const childNode of node.childNodes) {
      text += childNode.textContent;
      if (text.includes(preText)) {
        return this.getCursor(
          childNode,
          preText,
          text.slice(0, -childNode.textContent.length)
        );
      }
    }
  }

  save(el) {
    this.loading = true;
    if (el.innerText.length == 0 || el.innerText === '\n') {
      //el.innerText = placeholderText;
    }
    this.code = el.innerText;
    let params = new HttpParams();
    params = params.append('string', this.code);
    params = params.append('cursor', '1');
    params = params.append('parser', 'css');
    this.http
      .get('https://brainattic-server.appspot.com/format', {
        params
      })
      .subscribe(
        result => {
          this.code = result['formatted'];
          el.innerText = this.code;

          hljs.highlightBlock(el);
          this.loading = false;
        },
        error => {
          console.log(JSON.stringify(error));
          this.loading = false;
          //toast message goes here
        }
      );
  }
}
