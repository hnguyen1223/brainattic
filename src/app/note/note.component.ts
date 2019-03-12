import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../model/note';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { chunk } from '../model/chunk';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  @Input() editable: boolean = false;
  draggable: boolean = false;
  hover: false;

  constructor() {}

  ngOnInit() {}

  addSnippet(i) {
    if (i) {
      this.note.content.splice(i + 1, 0, { name: '', text: '', type: 3 });
    } else this.note.content.push({ name: '', text: '', type: 3 });
  }

  addText(i) {
    if (i) {
      this.note.content.splice(i + 1, 0, { name: '', text: '', type: 1 });
    } else this.note.content.push({ name: '', text: '', type: 1 });
  }

  addContent(i) {
    //TBD
    /*     if (this.note.content[i].type == 3)
      this.note.content.splice(i + 1, 0, {name:'',  text: '', type: 1 });
    else
      this.note.content.splice(i + 1, 0, {name:'',  text: '', type: 3 }); */
  }

  removeContent(i) {
    console.log(`remove ${i}`);

    this.note.content.splice(i, 1);
  }

  drop(event: CdkDragDrop<chunk[]>) {
    moveItemInArray(this.note.content, event.previousIndex, event.currentIndex);
  }
}
