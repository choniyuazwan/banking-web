import { Component, OnInit, ViewChild, AfterContentChecked, Injectable, ChangeDetectorRef } from '@angular/core';
import { AccountService } from 'src/app/shared/service/account.service';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { AccountAddComponent } from '../account-add/account-add.component';
import { Account } from 'src/app/shared/model/account';
import { AccountEditComponent } from '../account-edit/account-edit.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  // ngAfterContentChecked(): void {
  //   this.calllist()
  // }

  // ngAfterViewChecked(): void {
  //   console.log('proses refresh');
  //   this.calllist()
  // }

  displayedColumns: string[] = ['accountNumber', 'accountName', 'balance', 'openDate', 'edit', 'delete'];
  dataSource: MatTableDataSource<Account>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private accountService: AccountService, public dialog: MatDialog,
    private snackBar: MatSnackBar,  private changeDetectorRefs: ChangeDetectorRef) {  }

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

        // console.log('banyak account = ' + arrayAccounts.length);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  add(): void {
    const dialogRef = this.dialog.open(AccountAddComponent,{
      width: '640px', disableClose: true ,
    }).afterClosed().subscribe(result => this.calllist())
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
          this.accounts = response.data;
        }

        // this.changeDetectorRefs.detectChanges();

        let arrayAccounts = Object.keys(this.accounts).map(i => this.accounts[i])
        this.dataSource = new MatTableDataSource(arrayAccounts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
 
      }
    );
  }

  openSnackBar(message: string, success?: boolean) {
    let config = new MatSnackBarConfig();
    // config.verticalPosition = 'bottom';
    // config.horizontalPosition = 'center';
    config.duration = 5000;
    config.panelClass = success ? undefined : ['failed'];
    this.snackBar.open(message, success ? undefined : 'Retry', config);
  }


  delete(index) {
    this.accountService.deleteAccount(this.accounts[index].accountNumber).subscribe(
      response => {
        if(response.responseCode!=='01'){
          this.openSnackBar(response.responseMessage)
        }else{
          this.calllist();
          this.openSnackBar("Success delete account", true)
        }
      }
    )
  }
}

