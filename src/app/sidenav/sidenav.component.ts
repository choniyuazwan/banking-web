import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { CustomerService } from '../shared/service/customer.service';
import { Customer } from '../shared/model/customer';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;

  // fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  fillerNav = [
    { name:"Dashboard", route:"/dashboard", icon:"home" },
    { name:"Account", route:"/accountlist", icon:"credit_card" },
    { name:"Wallet", route:"/walletlist", icon:"account_balance_wallet" },
    { name:"Wallet Account", route:"/walletaccountlist", icon:"all_inbox" },
    { name:"Transaction", route:"/transactionlist", icon:"swap_horiz" },
  ]

  // fillerContent = Array.from({length: 50}, () =>
  //     `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  //      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  //      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  //      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
  //      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router:Router, private customerService:CustomerService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  logout() {
    localStorage.removeItem('cif');
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  shouldRun = true;

  customer:Customer = new Customer()

  ngOnInit() {
    this.customerService.getCustomer(localStorage.getItem('cif')).subscribe(
      response => {
        if(response.responseCode!=='01'){
          alert(JSON.stringify(response));
        }else{
          this.customer = response.data;
          // console.log(this.customer)
        }
      }
    )
  }

}
