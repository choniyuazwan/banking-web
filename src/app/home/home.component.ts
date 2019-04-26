import { Component, OnInit } from '@angular/core';

export interface Tile{
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'Head', cols: 7, rows: 1, color: 'lightblue'},
    {text: 'bodyleft', cols: 3, rows: 2, color: 'lightgreen'},
    {text: 'bosyright', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'footer', cols: 2, rows: 1, color: '#DDBDF1'},
  ];


  constructor() { }

  ngOnInit() {
  }

}
