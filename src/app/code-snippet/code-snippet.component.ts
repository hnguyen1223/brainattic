import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import hljs from 'highlight.js';

const placeholderText = '// Code goes here';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent implements OnInit {
  @ViewChild('snippet', { read: ElementRef }) snippet: ElementRef;
  @Input() code: string = `.example-gradient {
  background: -webkit-linear-gradient(left,     #cb60b3 0%, #c146a1 50%, #a80077 51%, #db36a4 100%); /* Chrome10+, Safari5.1+ */
  background:    -moz-linear-gradient(left,     #cb60b3 0%, #c146a1 50%, #a80077 51%, #db36a4 100%); /* FF3.6+ */
  background:     -ms-linear-gradient(left,     #cb60b3 0%, #c146a1 50%, #a80077 51%, #db36a4 100%); /* IE10+ */
  background:      -o-linear-gradient(left,     #cb60b3 0%, #c146a1 50%, #a80077 51%, #db36a4 100%); /* Opera 11.10+ */
  background:         linear-gradient(to right, #cb60b3 0%, #c146a1 50%, #a80077 51%, #db36a4 100%); /* W3C */
}
.example-angle {
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
}`;

  editable: boolean = false;
  loading: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.snippet.nativeElement.addEventListener('paste', function(e) {
      // cancel paste
      e.preventDefault();

      // get text representation of clipboard
      var text = (e.originalEvent || e).clipboardData.getData('text/plain');

      // insert text manually
      document.execCommand('insertHTML', false, text);
    });
  }

  toggleEditable(el) {
    this.editable = !this.editable;
  }

  selectAll(el) {
    el.setAttribute('contenteditable', 'true'); //Manually make it editable for focusing
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
      let range = document.getSelection().getRangeAt(0);
      let tabNode = document.createTextNode('  ');
      range.insertNode(tabNode);
      range.setStart(range.endContainer, range.endOffset);
    }
  }

  onKeyUp(event) {
    /* 
    if (event.target.innerText != this.code) {
      let range = document.getSelection().getRangeAt(0);
      let newRange = range.cloneRange();
      newRange.selectNodeContents(event.target);
      newRange.setEnd(range.endContainer, range.endOffset);
      let preText = newRange.toString();
      let offset = 0;
      let endNode;
      let newText = '';
      if (preText != '') {
        console.log(`preText ${preText}`);
        this.code = event.target.innerText;
        //hljs.highlightBlock(event.target);
        var result = this.getCursor(event.target, preText, newText);
        endNode = result.node;
        offset = event.key == 'Enter' ? 0 : result.offset;
        console.log(`node ${endNode.textContent}`);
        console.log(`offset ${offset}`);
        range = document.createRange();
        range.setStart(endNode, offset);

        document.getSelection().removeAllRanges();
        document.getSelection().addRange(range);
      }
    } */
  }
  /*   onBlur(event) {
    if (event.target.parentNode !== document.activeElement) {
      this.code = event.target.innerText;
      //ddddddddddddddddddddddddddddd
      hljs.highlightBlock(event.target);

      this.editable = false;
    }
  } */

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
      el.innerText = placeholderText;
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
          //hljs.highlightBlock(el);
          /*           let converted = hljs.highlightAuto(el.textContent);
          (<Element>el).innerHTML = converted.value;
          console.log(converted.value); */

          hljs.highlightBlock(el);
          this.loading = false;
          this.toggleEditable(el);
        },
        error => {
          console.log(JSON.stringify(error));
          this.loading = false;
          //toast message goes here
        }
      );
  }
}
