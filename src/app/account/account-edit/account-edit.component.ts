import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
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

  public cancelN(): void {
    this.dialog.closeAll();
  }

  customer: Customer = new Customer;

  edit() {
    this.account.accountName = this.addCusForm.controls['accountName'].value;
    this.accountService.editAccount(this.account).subscribe(
      response => {
        if(response.responseCode!=='01'){
          console.log(response);
        }else{
          // this.router.navigate(['/sidenav/accountlist'])
          console.log(response);
          window.location.reload();
        }
      }
    )
  }
}
