import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotesService } from '../notes.service';
import { Observable } from 'rxjs';
import { Note } from '../model/note';
import * as Isotope from 'isotope-layout';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {
  private notes: Observable<Note[]>;
  @ViewChild('grid') grid: ElementRef;

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

  editNote(element) {
  }
}
