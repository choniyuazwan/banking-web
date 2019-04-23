import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiscardComponent } from '../../discard/discard.component';

@Component({
  selector: 'app-wallet-add',
  templateUrl: './wallet-add.component.html',
  styleUrls: ['./wallet-add.component.css']
})
export class WalletAddComponent implements OnInit {

  public breakpoint: number; // Breakpoint observer code
  public addCusForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      IdProof: null,
       firstname: [null, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      email: [null, [Validators.required, Validators.email]],

        address: [null ],

    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  openDialog(): void {
    console.log("this.addCusForm",this.addCusForm.dirty);
    if(this.addCusForm.touched) {
      const dialogRef = this.dialog.open(DiscardComponent, {
        width: '340px',
      });
    } else {
      this.dialog.closeAll();
    }
  }

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }
}
