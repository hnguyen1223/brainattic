import { Component } from '@angular/core';
import { auth, User } from 'firebase';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Note, TextTypes } from './model/note';
import { MatDialog } from '@angular/material';
import { NotesService } from './notes.service';
import { NoteEditorComponent } from './note-editor/note-editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'brain-attic';
  private user$: Observable<User>;

  constructor(
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private notesService: NotesService
  ) {
    this.user$ = this.authService.getUser();
  }

  login(choice: number) {
    this.authService.login(choice);
  }

  editNote(note: Note) {
    console.log('edit called');

    let originalNote: string;
    if (note) {
      originalNote = JSON.stringify(note);
    } else {
      originalNote = JSON.stringify({
        id: '',
        title: '',
        created: new Date(),
        modified: new Date(),
        tags: [],
        fav: false,
        content: [{ text: '', type: TextTypes.TEXT, name: '' }]
      });
    }

    let newNote: Note = JSON.parse(originalNote);
    
    
    
    
    
    const dialogRef = this.dialog.open(NoteEditorComponent, {
      width: '900px',
      panelClass: 'custom-dialog-container',
      data: newNote
    });

    dialogRef.afterClosed().subscribe(result => {
      if (originalNote !== JSON.stringify(newNote)) {
        newNote.modified = new Date();
        if (note) this.notesService.updateNote(newNote);
        else this.notesService.addNote(newNote);
      }
    });
  }
}
