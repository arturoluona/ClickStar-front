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
      name: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      serial: ['', Validators.required],
      description: ['',],
    })
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
