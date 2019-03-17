import { Injectable } from '@angular/core';
import { Note } from './model/note';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, combineLatest } from 'rxjs/operators';
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
  private _notes: BehaviorSubject<Note[]> = new BehaviorSubject([]);
  private _filteredNotes: BehaviorSubject<Note[]> = new BehaviorSubject([]);

  private allTags: Observable<Set<string>>;
  private _chosenTags: BehaviorSubject<Set<string>> = new BehaviorSubject(new Set());
  private _filteredTags: BehaviorSubject<Set<string>> = new BehaviorSubject(new Set())

  public notes: Observable<Note[]> = this._notes.asObservable();
  public filteredNotes: Observable<Note[]> = this._filteredNotes.asObservable();
  public chosenTags: Observable<Set<string>> = this._chosenTags.asObservable();
  public filteredTags: Observable<Set<string>> = this._filteredTags.asObservable();

  constructor(private db: AngularFirestore) {
    this._notesCollection = db
      .collection('users')
      .doc('y4jLBH7HqXgJB5sM6IJTzTlNoVi2')
      .collection<Note>('Notes', ref => ref.orderBy('modified', 'desc'));
    this._notesCollection.stateChanges().subscribe(changeList => {
      console.log(changeList);
      this.updateList(changeList);
    });
    this.allTags = this.notes.pipe(map(list => {
      let set = new Set(list.flatMap(item => item.tags));
      return set;
    }));
  }

  getNote(id: string) {
    return this._notesCollection.doc<Note>(id).valueChanges();
  }

  addNote(note: Note): Observable<DocumentReference> {
    let tempNote: Note = JSON.parse(JSON.stringify(note));
    delete tempNote.id;
    return from(this._notesCollection.add(tempNote));
  }

  deleteNote(note: Note): Observable<void> {
    return from(this._notesCollection.doc(note.id).delete());
  }

  updateNote(note: Note): Observable<void> {
    let tempNote: Note = JSON.parse(JSON.stringify(note));
    delete tempNote.id;
    return from(this._notesCollection.doc(note.id).update(tempNote));
  }

  private updateList(changeList: DocumentChangeAction<Note>[]) {
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

  getFilteredNotes(): Observable<Note[]> {
    return this.filteredNotes;
  }

  //For autocomplete
  getFilteredTags(): Observable<Set<string>> {
    return this.filteredTags;
  }

  filter(word: string) {
  }


  getTags(): Observable<Set<string>> {
    return this.chosenTags;
  }

  addTag(tag: string) {
    this._chosenTags.next(
      this._chosenTags.getValue().splice(this._chosenTags.getValue().length, 0, tag)
    );

  }

  removeTag(tag: string) {
    let index = this._chosenTags.getValue().indexOf(tag);
    if (index > 0) this._chosenTags.next(this._chosenTags.getValue().splice(index, 1));
  }
  /* 
    moveUser() {
      this.notes.subscribe(list => {
        //this.db.collection('users').doc('y4jLBH7HqXgJB5sM6IJTzTlNoVi2').set({name: 'Huy Nguyen'});
        list.forEach(item => {
  
          this.db.collection('users').doc('y4jLBH7HqXgJB5sM6IJTzTlNoVi2').collection('Notes').doc(item.id).set(item);
        })
      })
    } */
}
