import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.css']
})
export class RouterComponent implements OnInit {

  public form: FormGroup;
  public initData: any;

  constructor(
    private builder: FormBuilder,
    private rest: RestService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      serial: ['', Validators.required],
      loader: ['',],
      description: ['',],
    })

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
      loader: this.form.value.loader,
      description: this.form.value.description,

    }
    this.rest.post('deviceRouter', send).subscribe(() => {
      this.close()
    })
  }
  close = () => this.bsModalRef.hide()

  cb = (e) => {
    this.close()
  }
}
