import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscardComponent } from '../../discard/discard.component';
import { Account } from 'src/app/shared/model/account';
import { AccountService } from 'src/app/shared/service/account.service';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})
export class AccountAddComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialog: MatDialog,  private route: ActivatedRoute, private router: Router, private accountService: AccountService) { }

  public breakpoint: number; // Breakpoint observer code
  public addCusForm: FormGroup;

  ngOnInit() {
    this.addCusForm = this.fb.group({
      accountName: ['', [Validators.required]],
      balance: ['', [Validators.required]],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onAddCus(): void {
    this.add();
    this.cancelN()
    // this.markAsDirty(this.addCusForm);
  }

  openDialog(): void {
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

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  get accountName() {
    return this.addCusForm.get('accountName')
  }

  get balance() {
    return this.addCusForm.get('balance')
  }

  public cancelN(): void {
    this.dialog.closeAll();
  }

  add() {
    let account = new Account();
    account.accountName = this.addCusForm.controls['accountName'].value;
    account.balance = this.addCusForm.controls['balance'].value;
    account.customer['cif'] = localStorage.getItem('cif');

    this.accountService.addAccount(account).subscribe(
      response => {
        if(response.responseCode!=='01'){
          console.log(response);
        }else{
          // this.router.navigate(['/login'])
          console.log(response);
        }
      }
    )
  }
}
