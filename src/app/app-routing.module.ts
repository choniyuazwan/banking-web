import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BarLoginComponent } from './bar-login/bar-login.component';
import { BarRegisterComponent } from './bar-register/bar-register.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { WalletListComponent } from './wallet/wallet-list/wallet-list.component';
import { WalletaccountListComponent } from './walletaccount/walletaccount-list/walletaccount-list.component';
import { TransactionListComponent } from './transaction/transaction-list/transaction-list.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { AuthenticationGuardService } from './shared/security/authentication-guard.service';
import { IsLoginService } from './shared/security/is-login.service';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: BarLoginComponent, canActivate: [IsLoginService] },
  { path: 'register', component: BarRegisterComponent, canActivate: [IsLoginService] },
  {
    path: '',
    component: SidenavComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'accountlist', component: AccountListComponent },
      { path: 'walletlist', component: WalletListComponent },
      { path: 'walletaccountlist', component: WalletaccountListComponent },
      { path: 'transactionlist', component: TransactionListComponent },
      { path: 'profile', component: ProfileDetailComponent },
    ], canActivate: [AuthenticationGuardService]
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
