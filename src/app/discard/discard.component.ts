import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-discard',
  templateUrl: './discard.component.html',
  styleUrls: ['./discard.component.css']
})
export class DiscardComponent implements OnInit {


  constructor(private fb: FormBuilder,
  private dialog: MatDialog, private dialogRef: MatDialogRef<DiscardComponent>) {} // Closing dialog window

  public cancel(): void { // To cancel the dialog window
  this.dialogRef.close();
  }

  public cancelN(): void {
      this.dialog.closeAll();
  }

  ngOnInit() {
  }
}
