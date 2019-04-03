import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { NotesService } from '../notes.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  MatAutocomplete,
  MatChipInputEvent,
  MatAutocompleteSelectedEvent
} from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { User } from 'firebase';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('searchBox') searchBox: ElementRef<HTMLInputElement>;

  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  chosenTags: Observable<Set<string>>;
  user$: Observable<User>;
  @Output() newNote = new EventEmitter<Boolean>();
  constructor(private notesService: NotesService, private authService: AuthenticationService) {}

  ngOnInit() {
    this.filteredTags = this.notesService.getFilteredTags(
      this.tagCtrl.valueChanges
    );
    this.chosenTags = this.notesService.getTags();
    this.user$ = this.authService.getUser();
  }

  addTag(event: MatChipInputEvent) {

    //Only if none of the autocomplete option is highlighted
    if (!this.matAutocomplete._keyManager.activeItem) {
      // Add tag
      if ((event.value || '').trim()) {
        this.notesService.addTag(event.value.trim());
      }

      // Reset the input value
      if (event.input) {
        event.input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  removeTag(tag: string) {
    this.notesService.removeTag(tag);
  }

  selectTag(event: MatAutocompleteSelectedEvent) {
    this.notesService.addTag(event.option.viewValue);
    this.searchBox.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  logout(){
    this.authService.logout();
  }
}
