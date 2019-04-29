import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { Customer } from 'src/app/shared/model/customer';
import { DiscardComponent } from 'src/app/discard/discard.component';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) { }

  public breakpoint: number; // Breakpoint observer code
  public addCusForm: FormGroup;
  public customer: Customer = new Customer();

  ngOnInit() {

    this.customerService.getCustomer(localStorage.getItem('cif')).subscribe(
      response => {
        if(response.responseCode!=='01'){
          alert(JSON.stringify(response));
        }else{
          this.customer = response.data;
          this.customerName.setValue(this.customer.firstname);
        }
      }
    )

    this.addCusForm = this.fb.group({
      customerName: ['', [Validators.required]],
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


  get customerName() {
    return this.addCusForm.get('customerName')
  }

  public cancelN(): void {
    this.dialog.closeAll();
  }

  openSnackBar(message: string, success?: boolean) {
    let config = new MatSnackBarConfig();
    // config.verticalPosition = 'bottom';
    // config.horizontalPosition = 'center';
    config.duration = 5000;
    config.panelClass = success ? undefined : ['failed'];
    this.snackBar.open(message, success ? undefined : 'Retry', config);
  }

  edit() {
    this.customer.firstname = this.addCusForm.controls['customerName'].value;
    this.customerService.editCustomer(this.customer).subscribe(
      response => {
        if(response.responseCode!=='01'){
          this.openSnackBar("Failed edit customer");
        }else{
          this.openSnackBar("Edit customer success", true);
        }
      }
    )
  }

}
