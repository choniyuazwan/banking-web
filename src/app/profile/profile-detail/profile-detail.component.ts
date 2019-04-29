import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Customer } from 'src/app/shared/model/customer';
import { MatDialog } from '@angular/material';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  constructor(private customerService:CustomerService, public dialog: MatDialog) { }

  customer:Customer = new Customer();

  ngOnInit() {
    this.customerService.getCustomer(localStorage.getItem('cif')).subscribe(
      response => {
        if(response.responseCode!=='01'){
          alert(JSON.stringify(response));
        }else{
          this.customer = response.data;
          console.log(this.customer)
        }
      }
    )

  }


  edit() {
    const dialogRef = this.dialog.open(ProfileEditComponent,{
      width: '640px', disableClose: true
    });
  }



}
