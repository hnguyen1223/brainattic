import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material/angular-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { HttpClientModule } from '@angular/common/http';
import { NoteComponent } from './note/note.component';
import { NotesService } from './notes.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { NgxMasonryModule } from 'ngx-masonry';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken
} from '@angular/fire/firestore';
import { NotesContainerComponent } from './notes-container/notes-container.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeSnippetComponent,
    NoteComponent,
    NotesContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgxMasonryModule
  ],
  providers: [NotesService, { provide: FirestoreSettingsToken, useValue: {} }], //until timestampsInSnapshots is removed  https://github.com/angular/angularfire2/issues/1993
  bootstrap: [AppComponent]
})
export class AppModule {}
