import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Observable } from 'rxjs';
import { Note } from '../model/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  private notes: Observable<{ id: string; note: Note }[]>;

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notes = this.notesService.notes;
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note);
  }

  updateNote(note) {
    this.notesService.updateNote(note);
  }
}
