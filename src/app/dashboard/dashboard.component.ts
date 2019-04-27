import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 600 ? 1 : 4; // Breakpoint observer code
  }

  public breakpoint: number; // Breakpoint observer code

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {
    this.breakpoint = 4;
    if(event.target.innerWidth <= 600) {
      this.breakpoint = 1;
    } else if(event.target.innerWidth <= 900) {
      this.breakpoint = 2;
    }

    // this.breakpoint = event.target.innerWidth <= 600 ? 1 : 4;
  }
}
