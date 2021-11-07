import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrls: ['./otros.component.css']
})
export class OtrosComponent implements OnInit {

  public form: FormGroup;
  public initData: any;

  constructor(
    private builder: FormBuilder,
    private rest: RestService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      name: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      serial: ['', Validators.required],
      description: ['']
    })

    if (this.initData) {
      this.form.patchValue(this.initData?.label);
      Object.keys(this.form.controls).forEach(ctrl => this.form.controls[ctrl].disable());
      console.log(this.initData);
    }
  }
  submit(){
    this.rest.post('deviceOthers', this.form.value).subscribe(() => {
      this.close()
    })
  }
  close = () => this.bsModalRef.hide()

  cb = (e) => {
    this.close()
  }
}
