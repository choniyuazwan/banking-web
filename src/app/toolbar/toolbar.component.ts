import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.paramMap.subscribe((params: ParamMap) => {

    // })
    // this.href = this.router.url;
    // console.log(this.router.url);
  }

  showLogin() {
    this.router.navigate(['login'], {relativeTo: this.route})
  }

  showRegister() {
    this.router.navigate(['register'], {relativeTo: this.route})
  }
}
