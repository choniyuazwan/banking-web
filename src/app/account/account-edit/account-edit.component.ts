import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/shared/service/account.service';
import { DiscardComponent } from 'src/app/discard/discard.component';
import { Customer } from 'src/app/shared/model/customer';
import { Account } from 'src/app/shared/model/account';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { console.log(this.data) }

  public breakpoint: number; // Breakpoint observer code
  public addCusForm: FormGroup;
  public account: Account = new Account();

  ngOnInit() {

    this.accountService.getAccount(this.data.accountNumber).subscribe(
      response => {
        if(response.responseCode!=='01'){
          alert(JSON.stringify(response));
        }else{
          this.account = response.data;
          this.accountName.setValue(this.account.accountName);
        }
      }
    )

    this.addCusForm = this.fb.group({
      accountName: ['', [Validators.required]],
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public onAddCus(): void {
    this.edit();
    this.cancelN()
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


  get accountName() {
    return this.addCusForm.get('accountName')
  }

  public cancelN(): void {
    this.dialog.closeAll();
  }

  customer: Customer = new Customer;

  openSnackBar(message: string, success?: boolean) {
    let config = new MatSnackBarConfig();
    // config.verticalPosition = 'bottom';
    // config.horizontalPosition = 'center';
    config.duration = 5000;
    config.panelClass = success ? undefined : ['failed'];
    this.snackBar.open(message, success ? undefined : 'Retry', config);
  }
  
  edit() {
    this.account.accountName = this.addCusForm.controls['accountName'].value;
    this.accountService.editAccount(this.account).subscribe(
      response => {
        if(response.responseCode!=='01'){
          this.openSnackBar("Failed edit account");
        }else{
          this.openSnackBar("Edit account success", true);
        }
      }
    )
  }
}
