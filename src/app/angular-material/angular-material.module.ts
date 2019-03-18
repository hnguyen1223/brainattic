import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatDividerModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    DragDropModule,
    MatChipsModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    OverlayModule,
    MatDialogModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    DragDropModule,
    MatChipsModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    OverlayModule,
    MatDialogModule
  ]
})
export class AngularMaterialModule {}
