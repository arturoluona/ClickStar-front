import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  public form1: FormGroup;


  constructor(
    private builder: FormBuilder,
    private rest: RestService,    
    public bsModalRef: BsModalRef
    ) { }
  ngOnInit(): void {
    this.form1 = this.builder.group({
      model: ['', Validators.required],
      make: ['', Validators.required],
      serial:['', Validators.required],
      inch: ['',],
      description: ['', Validators.required],

  });

  }
  submit(){
    const send = {
      model: this.form1.value.model,
      make: this.form1.value.make,
      serial: this.form1.value.serial,
      cabezal: this.form1.value.cabezal,
      inch: this.form1.value.inch,
      description: this.form1.value.description,

    }
    this.rest.post('deviceMonitor', send).subscribe(() => {
      this.close()
    })
  }
  close = () => this.bsModalRef.hide()

  cb = (e) => {
    this.close()
  }
}