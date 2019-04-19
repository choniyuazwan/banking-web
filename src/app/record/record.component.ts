import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  records: any;

  constructor(private myFirstService : RecordService) { }

  ngOnInit() {
    this.myFirstService.getData().subscribe(data => {
      this.records = data.obj;
    })
  }

}
