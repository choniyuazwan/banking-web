import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { WalletAddComponent } from '../wallet-add/wallet-add.component';
import { Wallet } from 'src/app/shared/model/wallet';
import { WalletService } from 'src/app/shared/service/wallet.service';
import { WalletEditComponent } from '../wallet-edit/wallet-edit.component';
import { UtilService } from 'src/app/shared/util/util.service';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit {
  
  // ngAfterContentChecked(): void {
  //   this.calllist()
  // }

  calllist(){
    this.walletService.getWallets(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          this.wallets = response.data;
        }

        this.changeDetectorRefs.detectChanges();

        let arrayWallets = Object.keys(this.wallets).map(i => this.wallets[i])
        this.dataSource = new MatTableDataSource(arrayWallets);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  displayedColumns: string[] = ['id', 'description', 'createdDate', 'edit', 'delete'];
  dataSource: MatTableDataSource<Wallet>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private walletService: WalletService, public dialog: MatDialog, private utilService: UtilService, private changeDetectorRefs: ChangeDetectorRef) {  }

  wallets:Wallet;

  ngOnInit() {
    this.walletService.getWallets(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          this.wallets = response.data;
        }

        let arrayWallets = Object.keys(this.wallets).map(i => this.wallets[i])
        this.dataSource = new MatTableDataSource(arrayWallets);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  add(): void {
    const dialogRef = this.dialog.open(WalletAddComponent,{
      width: '640px', disableClose: true ,
    }).afterClosed().subscribe(() => this.calllist())
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(index) {
    const dialogRef = this.dialog.open(WalletEditComponent,{
      width: '640px', disableClose: true ,
      data: {
        id : this.wallets[index].id
      }
    });
  }

  delete(index) {
    this.walletService.deleteWallet(this.wallets[index].id).subscribe(
      response => {
        console.log('pesan response', response)
        if(response.responseCode!=='01'){
          this.utilService.openSnackBar(response.responseMessage)
        }else{
          this.calllist();
          this.utilService.openSnackBar('Wallet has been deleted successfully', true)
        }
      }
    )
  }

}
