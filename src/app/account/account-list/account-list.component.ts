import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/service/account.service';
import { Account } from '../../shared/model/account';
import { MatDialog } from '@angular/material';
import { AccountAddComponent } from '../account-add/account-add.component';


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  constructor(private accountService: AccountService, public dialog: MatDialog) { }

  accounts:Account;

  ngOnInit() {
    this.accountService.getAccounts(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          this.accounts = response.data;
        }
      }
    );
  }

  add(): void {
    const dialogRef = this.dialog.open(AccountAddComponent,{
      width: '640px', disableClose: true ,
    });
  }
}
