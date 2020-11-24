import { Component, OnInit } from '@angular/core';
import { FormMonitorService } from './form-monitor.service';

@Component({
  selector: 'app-form-monitor',
  templateUrl: './form-monitor.component.html',
  styleUrls: ['./form-monitor.component.css']
})
export class FormMonitorComponent implements OnInit {


  constructor(
    public formMonitor: FormMonitorService,
  ) { }

  ngOnInit(): void {
  }

  public openModal(data = <any>{}) { 
    this.formMonitor.openOrder(data)
  }
}
