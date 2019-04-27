import { Component, OnInit, ViewChild } from '@angular/core';
import { WalletAccount } from 'src/app/shared/model/wallet-account';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { WalletAccountService } from 'src/app/shared/service/wallet-account.service';
import { WalletaccountAddComponent } from '../walletaccount-add/walletaccount-add.component';

@Component({
  selector: 'app-walletaccount-list',
  templateUrl: './walletaccount-list.component.html',
  styleUrls: ['./walletaccount-list.component.css']
})
export class WalletaccountListComponent implements OnInit {
  ngAfterContentChecked(): void {
    this.calllist()
  }

  calllist(){
    this.walletAccountService.getWalletAccounts(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          this.walletAccounts = response.data;
        }

        let arrayAccounts = Object.keys(this.walletAccounts).map(i => this.walletAccounts[i])
        this.dataSource = new MatTableDataSource(arrayAccounts);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  displayedColumns: string[] = ['id', 'wallet', 'account', 'delete'];
  dataSource: MatTableDataSource<WalletAccount>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private walletAccountService: WalletAccountService, public dialog: MatDialog,
    private snackBar: MatSnackBar) {  }

  walletAccounts: WalletAccount;

  ngOnInit() {
    this.walletAccountService.getWalletAccounts(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          this.walletAccounts = response.data;
        }

        let arrayAccounts = Object.keys(this.walletAccounts).map(i => this.walletAccounts[i])
        this.dataSource = new MatTableDataSource(arrayAccounts);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add() {
    const dialogRef = this.dialog.open(WalletaccountAddComponent,{
      width: '640px', disableClose: true ,
    });
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
    this.walletAccountService.deleteWalletAccount(this.walletAccounts[index].id).subscribe(
      response => {
        if(response.responseCode!=='01'){
          this.openSnackBar("Failed unregister account")
        }else{
          this.openSnackBar("Unregister account success", true)
        }
      }
    )
  }
}
