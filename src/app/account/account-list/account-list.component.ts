import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/shared/service/account.service';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { AccountAddComponent } from '../account-add/account-add.component';
import { Account } from 'src/app/shared/model/account';


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<Account>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private accountService: AccountService, public dialog: MatDialog) {
    // // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
  }

  accounts:Account;
  // arrayAccount:any[];

  ngOnInit() {
    this.accountService.getAccounts(localStorage.getItem('cif')).subscribe(
      response => {
        if (response.responseCode !== '01') {
          alert(response.responseMessage);
        } else {
          alert(JSON.stringify(response.data))
          this.accounts = response.data;
        }



        // this.arrayAccount = Object.keys(this.accounts).map(function(personNamedIndex){
        //   let person = this.accounts[personNamedIndex];
        //   // do something with person
        //   return person;
        // });

        let arrayAccount = Object.keys(this.accounts).map(i => this.accounts[i])

        this.dataSource = new MatTableDataSource(arrayAccount);


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
}

