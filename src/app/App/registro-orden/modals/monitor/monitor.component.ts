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
  public form: FormGroup;


  constructor(
    private builder: FormBuilder,
    private rest: RestService,    
    public bsModalRef: BsModalRef
    ) { }
  ngOnInit(): void {
    this.form = this.builder.group({
      model: ['', Validators.required],
      make: ['', Validators.required],
      serial:['', Validators.required],
      inch: ['',],
      description: ['', Validators.required],

  });

  }
  submit(){
    this.rest.post('deviceMonitor', this.form.value).subscribe(() => {
      this.close()
    })
  }
  close = () => this.bsModalRef.hide()

  cb = (e) => {
    this.close()
  }
}