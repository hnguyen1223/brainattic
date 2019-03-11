import { Injectable } from '@angular/core';
import { Note } from './model/note';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private _notesCollection: AngularFirestoreCollection<Note>;
  private _notesWithMeta: Observable<DocumentChangeAction<Note>[]>;
  private _notes: BehaviorSubject<Note[]> = new BehaviorSubject([]);
  public notes: Observable<Note[]> = this._notes.asObservable();

  constructor(private db: AngularFirestore) {
    this._notesCollection = db
      .collection('users')
      .doc('KkW3rw28unKqoOyAlJZc')
      .collection<Note>('Notes', ref => ref.orderBy('modified', 'desc'));
    this._notesCollection.stateChanges().subscribe(changeList => {
      console.log(changeList);
      this.updateNotes(changeList);
    });
  }

  getNote(id: string) {
    return this._notesCollection.doc<Note>(id).valueChanges();
  }

  addNote(note: Note): Observable<DocumentReference> {
    return from(this._notesCollection.add(note));
  }

  deleteNote(note: Note): Observable<void> {
    return from(this._notesCollection.doc(note.id).delete());
  }

  updateNote(note: Note): Observable<void> {
    return from(this._notesCollection.doc(note.id).update(note));
  }

  private updateNotes(changeList: DocumentChangeAction<Note>[]) {
    let currentList = this._notes.getValue();
    let newList = changeList.map(i => i.payload);
    newList.forEach(change => {
      if (change.type == 'added') {
        currentList.push(change.doc.data());
        currentList[currentList.length - 1].id = change.doc.id;
        //currentList[currentList.length - 1].content.push({ text: '', type: 1 });
      } else if (change.type == 'modified') {
        let index = currentList.indexOf(
          currentList.find(item => item.id == change.doc.id)
        );
        currentList[index] = change.doc.data() as Note;
        currentList[index].id = change.doc.id;
        //currentList[index].content.push({ text: '', type: 1 });
      } else {
        let temp = currentList.find(item => item.id == change.doc.id);
        currentList.splice(currentList.indexOf(temp), 1);
      }
    });
  }
}
