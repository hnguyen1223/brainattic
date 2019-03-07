import { Injectable } from '@angular/core';
import { Note } from './model/note';
import { NOTES_MOCK } from './model/notes-mock';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private _notes: BehaviorSubject<Note[]> = new BehaviorSubject(NOTES_MOCK);
  private notesCollection: AngularFirestoreCollection<Note>;
  public notes: Observable<{ id: string; note: Note }[]>;

  constructor(private db: AngularFirestore) {
    this.notesCollection = db
      .collection('users')
      .doc('KkW3rw28unKqoOyAlJZc')
      .collection<Note>('Notes');
    this.notes = this.notesCollection.snapshotChanges().pipe(
      map(a => {
        return a.map(i => {
          return {
            id: i.payload.doc.id,
            note: i.payload.doc.data()
          };
        });
      })
    );
  }

  getNote(id: string) {
    return this.notesCollection.doc<Note>(id).valueChanges();
  }

  addNote(note: Note): Observable<any> {
    return from(this.notesCollection.add(note));
  }

  deleteNote(note: Note): Observable<any> {
    return from(this.notesCollection.doc(note.id).delete());
  }

  updateNote(note: Note): Observable<any> {
    return from(this.notesCollection.doc(note.id).update(note));
  }
}
