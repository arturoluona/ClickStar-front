import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  public form: FormGroup;
  public initData: any;

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
    if (this.initData) {
      this.form.patchValue(this.initData?.label);
      Object.keys(this.form.controls).forEach(ctrl => this.form.controls[ctrl].disable());
      console.log(this.initData);
    }

  }
  submit(){
    const send = {
      model: this.form.value.model,
      make: this.form.value.make,
      serial: this.form.value.serial,
      cabezal: this.form.value.cabezal,
      inch: this.form.value.inch,
      description: this.form.value.description,

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
