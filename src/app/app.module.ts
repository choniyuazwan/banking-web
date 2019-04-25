import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './customer/login/login.component';
import { RegisterComponent } from './customer/register/register.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BarLoginComponent } from './bar-login/bar-login.component';
import { BarRegisterComponent } from './bar-register/bar-register.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { AccountAddComponent } from './account/account-add/account-add.component';
import { WalletListComponent } from './wallet/wallet-list/wallet-list.component';
import { WalletAddComponent } from './wallet/wallet-add/wallet-add.component';
import { WalletaccountAddComponent } from './walletaccount/walletaccount-add/walletaccount-add.component';
import { WalletaccountListComponent } from './walletaccount/walletaccount-list/walletaccount-list.component';
import { TransactionListComponent } from './transaction/transaction-list/transaction-list.component';
import { TransactionTopupComponent } from './transaction/transaction-topup/transaction-topup.component';
import { TransactionWithdrawComponent } from './transaction/transaction-withdraw/transaction-withdraw.component';
import { TransactionTransferComponent } from './transaction/transaction-transfer/transaction-transfer.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { DiscardComponent } from './discard/discard.component';
import { AccountEditComponent } from './account/account-edit/account-edit.component';
import { WalletEditComponent } from './wallet/wallet-edit/wallet-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    BarLoginComponent,
    BarRegisterComponent,
    AccountListComponent,
    AccountAddComponent,
    WalletListComponent,
    WalletAddComponent,
    WalletaccountAddComponent,
    WalletaccountListComponent,
    TransactionListComponent,
    TransactionTopupComponent,
    TransactionWithdrawComponent,
    TransactionTransferComponent,
    ProfileDetailComponent,
    DiscardComponent,
    AccountEditComponent,
    WalletEditComponent,
  ],
  // exports: [AccountAddComponent, DiscardComponent],
  entryComponents: [
    DiscardComponent,

    WalletAddComponent,
    WalletEditComponent,

    TransactionTopupComponent,
    TransactionTransferComponent,
    TransactionWithdrawComponent,

    AccountAddComponent,
    AccountEditComponent,

    WalletaccountAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
