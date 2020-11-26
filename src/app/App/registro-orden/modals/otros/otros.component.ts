import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrls: ['./otros.component.css']
})
export class OtrosComponent implements OnInit {

  public form: FormGroup;

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
      description: ['',],
    })
  }
  submit(){
    const send = {
      model: this.form.value.model,
      make: this.form.value.make,
      serial: this.form.value.serial,
      description: this.form.value.description,

    }
    this.rest.post('deviceOthers', send).subscribe(() => {
      this.close()
    })
  }
  close = () => this.bsModalRef.hide()

  cb = (e) => {
    this.close()
  }
}
