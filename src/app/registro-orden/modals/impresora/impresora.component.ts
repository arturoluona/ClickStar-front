import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-impresora',
  templateUrl: './impresora.component.html',
  styleUrls: ['./impresora.component.css']
})
export class ImpresoraComponent implements OnInit {

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
      cabezal: ['', Validators.required],
      tinta: ['', Validators.required],
      description: ['', Validators.required],
    });

    if (this.initData) {
      this.form.patchValue(this.initData?.label);
      Object.keys(this.form.controls).forEach(ctrl => this.form.controls[ctrl].disable());
      console.log(this.initData);
    }
  }
  submit(){
    this.rest.post('devicePrinter', this.form.value).subscribe(() => {
      this.close();
    });
  }
  close = () => this.bsModalRef.hide();

  cb = (e) => {
    this.close();
  }
}
