import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './customer/login/login.component';
import { RegisterComponent } from './customer/register/register.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AppComponent } from './app.component';
import { BarLoginComponent } from './bar-login/bar-login.component';
import { BarRegisterComponent } from './bar-register/bar-register.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { WalletListComponent } from './wallet/wallet-list/wallet-list.component';
import { WalletaccountListComponent } from './walletaccount/walletaccount-list/walletaccount-list.component';
import { TransactionListComponent } from './transaction/transaction-list/transaction-list.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { WalletAddComponent } from './wallet/wallet-add/wallet-add.component';
import { WalletEditComponent } from './wallet/wallet-edit/wallet-edit.component';

const routes: Routes = [
  { path: '', component: SidenavComponent },
  { path: 'login', component: BarLoginComponent },
  { path: 'register', component: BarRegisterComponent },
  {
    path: 'sidenav',
    component: SidenavComponent,
    children: [
      { path: 'accountlist', component: AccountListComponent },
      { path: 'walletlist', component: WalletListComponent },
      { path: 'walletaccountlist', component: WalletaccountListComponent },
      { path: 'transactionlist', component: TransactionListComponent },
      { path: 'profile', component: ProfileDetailComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
