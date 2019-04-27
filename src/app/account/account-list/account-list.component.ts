import { Component, OnInit, ViewChild, AfterContentChecked } from '@angular/core';
import { AccountService } from 'src/app/shared/service/account.service';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { AccountAddComponent } from '../account-add/account-add.component';
import { Account } from 'src/app/shared/model/account';
import { AccountEditComponent } from '../account-edit/account-edit.component';


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit, AfterContentChecked {
  ngAfterContentChecked(): void {
    this.calllist()
  }

  displayedColumns: string[] = ['accountNumber', 'accountName', 'balance', 'openDate', 'edit', 'delete'];
  dataSource: MatTableDataSource<Account>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private accountService: AccountService, public dialog: MatDialog) {  }

  accounts:Account;

  ngOnInit() {
    this.accountService.getAccounts(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          // alert(JSON.stringify(response.data))
          this.accounts = response.data;
        }

        let arrayAccounts = Object.keys(this.accounts).map(i => this.accounts[i])
        this.dataSource = new MatTableDataSource(arrayAccounts);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  add(): void {
    const dialogRef = this.dialog.open(AccountAddComponent,{
      width: '640px', disableClose: true ,
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(index) {
    const dialogRef = this.dialog.open(AccountEditComponent,{
      width: '640px', disableClose: true ,
      data: {
        accountNumber : this.accounts[index].accountNumber
      }
    });
  }

  calllist(){
    
    this.accountService.getAccounts(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          // alert(JSON.stringify(response.data))
          this.accounts = response.data;
        }

        let arrayAccounts = Object.keys(this.accounts).map(i => this.accounts[i])
        this.dataSource = new MatTableDataSource(arrayAccounts);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  delete(index) {
    this.accountService.deleteAccount(this.accounts[index].accountNumber).subscribe(
      response => {
        if(response.responseCode!=='01'){
          console.log(response);
        }else{
          console.log(response);
          window.location.reload();
        }
      }
    )
  }
}

