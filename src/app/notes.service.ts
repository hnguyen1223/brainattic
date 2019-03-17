import { Injectable } from '@angular/core';
import { Note } from './model/note';
import { BehaviorSubject, Observable, from, combineLatest } from 'rxjs';
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
  private _notesCollection: AngularFirestoreCollection<Note>; //Firestore db
  private _allNotes: BehaviorSubject<Note[]> = new BehaviorSubject([]); // All notes source
  private allTags: Observable<Set<string>>; // all tags source
  private _chosenTags: BehaviorSubject<Set<string>> = new BehaviorSubject(
    new Set()
  ); // user chosen tags source

  public allNotes: Observable<Note[]> = this._allNotes.asObservable();
  public filteredNotes: Observable<Note[]>;
  public chosenTags: Observable<Set<string>> = this._chosenTags.asObservable();

  constructor(private db: AngularFirestore) {
    this._notesCollection = db
      .collection('users')
      .doc('y4jLBH7HqXgJB5sM6IJTzTlNoVi2')
      .collection<Note>('Notes', ref => ref.orderBy('modified', 'desc'));

    this._notesCollection.stateChanges().subscribe(changeList => {
      console.log(changeList);
      this.updateList(changeList);
    });

    this.allTags = this.allNotes.pipe(
      map(list => {
        let set = new Set(list.flatMap(item => item.tags));
        return set;
      })
    );

    this.filteredNotes = combineLatest(this._allNotes, this._chosenTags).pipe(
      map(([notesArray, tagSet]) =>
        notesArray.filter(note =>
          Array.from(tagSet).every(tag => note.tags.indexOf(tag) != -1)
        )
      )
    );
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
    let currentList = this._allNotes.getValue();
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
    this._allNotes.next(currentList);
  }

  getFilteredNotes(): Observable<Note[]> {
    return this.filteredNotes;
  }

  //For autocomplete
  getFilteredTags(source: Observable<string>): Observable<string[]> {
    return combineLatest(source, this.allTags).pipe(
      map(([word, tagSet]) => {
        return Array.from(tagSet).filter(tag => tag.indexOf(word) === 0);
      })
    );
  }

  getTags(): Observable<Set<string>> {
    return this.chosenTags;
  }

  addTag(tag: string) {
    this._chosenTags.next(this._chosenTags.getValue().add(tag));
  }

  removeTag(tag: string) {
    let set = this._chosenTags.getValue();
    set.delete(tag);
    this._chosenTags.next(set);
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
