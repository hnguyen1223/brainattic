import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material/angular-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteComponent } from './note/note.component';
import { NotesService } from './notes.service';
import { AngularFireModule } from '@angular/fire';
import { OverlayModule } from '@angular/cdk/overlay';
import { environment } from 'src/environments/environment';
import { IconsModule } from './icons/icons.module';
import { NgxMasonryModule } from 'ngx-masonry';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken
} from '@angular/fire/firestore';
import { NotesContainerComponent } from './notes-container/notes-container.component';
import { ChunkComponent } from './chunk/chunk.component';
import { LinkSnippetComponent } from './link-snippet/link-snippet.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeSnippetComponent,
    NoteComponent,
    NotesContainerComponent,
    ChunkComponent,
    LinkSnippetComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgxMasonryModule,
    IconsModule
  ],
  providers: [NotesService, { provide: FirestoreSettingsToken, useValue: {} }], //until timestampsInSnapshots is removed  https://github.com/angular/angularfire2/issues/1993
  bootstrap: [AppComponent]
})
export class AppModule { }
