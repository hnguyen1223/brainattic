import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../model/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  @Input() editable: boolean;
  hover: false;

  constructor() { }

  ngOnInit() { }

  addSnippet(i) {
    if (i) {
      this.note.content.splice(i + 1, 0, { text: '', type: 3 });
    } else this.note.content.push({ text: '', type: 3 });
  }

  addText(i) {
    if (i) {
      this.note.content.splice(i + 1, 0, { text: '', type: 1 });
    } else this.note.content.push({ text: '', type: 1 });
  }

  addContent(i) {
    if (this.note.content[i].type == 3)
      this.note.content.splice(i + 1, 0, { text: '', type: 1 });
    else
      this.note.content.splice(i + 1, 0, { text: '', type: 3 });

  }
}
