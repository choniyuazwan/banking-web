import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from 'src/app/shared/service/wallet.service';
import { Wallet } from 'src/app/shared/model/wallet';
import { DiscardComponent } from 'src/app/discard/discard.component';
import { Customer } from 'src/app/shared/model/customer';
import { UtilService } from 'src/app/shared/util/util.service';

@Component({
  selector: 'app-wallet-edit',
  templateUrl: './wallet-edit.component.html',
  styleUrls: ['./wallet-edit.component.css']
})
export class WalletEditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private walletService: WalletService,
    private utilService: UtilService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { console.log(this.data) }

  public breakpoint: number; // Breakpoint observer code
  public addCusForm: FormGroup;
  public wallet: Wallet = new Wallet();

  ngOnInit() {

    this.walletService.getWallet(this.data.id).subscribe(
      response => {
        if(response.responseCode!=='01'){
          alert(JSON.stringify(response));
        }else{
          this.wallet = response.data;
          this.description.setValue(this.wallet.description);
        }
      }
    )

    this.addCusForm = this.fb.group({
      description: ['', [Validators.required]],
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

  get description() {
    return this.addCusForm.get('description')
  }

  public cancelN(): void {
    this.dialog.closeAll();
  }

  edit() {
    this.wallet.description = this.addCusForm.controls['description'].value;
    this.walletService.editWallet(this.wallet).subscribe(
      response => {
        if(response.responseCode!=='01'){
          this.utilService.openSnackBar('Failed edit wallet');
        }else{
          this.utilService.openSnackBar('Edit wallet success', true)
        }
      }
    )
  }

}
