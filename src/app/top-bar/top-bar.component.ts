import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotesService } from '../notes.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  MatAutocomplete,
  MatChipInputEvent,
  MatAutocompleteSelectedEvent
} from '@angular/material';
import { startWith, map } from 'rxjs/operators';

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

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.filteredTags = this.notesService.getFilteredTags(
      this.tagCtrl.valueChanges
    );
    this.chosenTags = this.notesService.getTags();
  }

  addTag(event: MatChipInputEvent) {
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

  removeTag(tag: string) {
    this.notesService.removeTag(tag);
  }

  selectTag(event: MatAutocompleteSelectedEvent) {
    this.notesService.addTag(event.option.viewValue);
    this.searchBox.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }
}
