import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  EventEmitter,
  Output
} from '@angular/core';
import { NotesService } from '../notes.service';
import { Observable } from 'rxjs';
import { Note } from '../model/note';
import * as Isotope from 'isotope-layout';
import { UistateService } from '../uistate.service';
import { ComponentPortal } from '@angular/cdk/portal';
import { NoteComponent } from '../note/note.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NoteEditorComponent } from '../note-editor/note-editor.component';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {
  private notes: Observable<Note[]>;
  private editable: boolean = false;
  @Output() private editNote = new EventEmitter<Note>();
  @ViewChild('grid') grid: ElementRef;

  constructor(
    private notesService: NotesService,
    private uiStateService: UistateService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.notes = this.notesService.filteredNotes;
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note);
  }

  updateNote(note) {
    this.notesService.updateNote(note);
  }
  open(note: Note) {}
}
