import { Component, OnInit, Input } from '@angular/core';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/show-invisibles/prism-show-invisibles';
import 'prismjs/plugins/previewers/prism-previewers';

const placeholderText = '// Code goes here';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent implements OnInit {
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
  constructor() {}

  ngOnInit() {}

  toggleEditable(el) {
    this.editable = !this.editable;
    if (el) {
      el.setAttribute('contenteditable', 'true'); //Manually make it editable for focusing
      this.placeCaretAtEnd(el);
    }
  }

  placeCaretAtEnd(el) {
    let range = document.createRange();

    let lineNumberEl = document.querySelector('.line-numbers-rows');
    if (lineNumberEl) lineNumberEl.setAttribute('contenteditable', 'false');

    range.selectNodeContents(el);
    range.collapse(false);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  onKeyDown(event) {
    if (event.key == 'Tab') {
      event.preventDefault();
      let range = document.getSelection().getRangeAt(0);
      let tabNode = document.createTextNode('\u00a0\u00a0');
      range.insertNode(tabNode);
      range.setStart(range.endContainer, range.endOffset);
    }
  }

  onKeyUp(event) {
    if (event.target.innerText != this.code) {
      let range = document.getSelection().getRangeAt(0);
      let newRange = range.cloneRange();
      newRange.selectNodeContents(event.target);
      newRange.setEnd(range.endContainer, range.endOffset);
      let preText = newRange.toString();
      let offset = 0;
      let endNode;
      let newText = '';
      console.log(`preText: ${preText}`);
      if (preText != '') {
        this.code = event.target.innerText;
        Prism.highlightElement(event.target);

        let childNodes = event.target.childNodes;
        let i = 0;
        while (i < childNodes.length && !newText.includes(preText)) {
          if (childNodes[i].nodeType == 3) newText += childNodes[i].textContent;
          else newText += childNodes[i].childNodes[0].textContent;
          i++;
        }
        if (newText.includes(preText)) {
          console.log(`newText: ${newText}`);
          i--;
          endNode =
            childNodes[i].nodeType == 3
              ? childNodes[i]
              : childNodes[i].childNodes[0];
          offset = endNode.textContent.length - newText.length + preText.length;
        }

        range = document.createRange();
        range.setStart(endNode, offset);

        document.getSelection().removeAllRanges();
        document.getSelection().addRange(range);
      }
    }
  }
  onBlur(event) {
    if (event.target.parentNode !== document.activeElement) {
      this.code = event.target.innerText;
      Prism.highlightElement(event.target);
      this.editable = false;
    }
  }

  save(el) {
    if (el.innerText.length == 0 || el.innerText === '\n') {
      el.innerText = placeholderText;
    } else console.log(el.innerText);
    this.code = el.innerText;
    Prism.highlightElement(el);
  }
}
