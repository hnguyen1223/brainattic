import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotesService } from '../notes.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete } from '@angular/material';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[];

  @ViewChild('search-box') searchBox: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  
  constructor(private NotesService: NotesService) {}

  ngOnInit() {}
}
