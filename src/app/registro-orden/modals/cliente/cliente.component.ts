import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public form: FormGroup;


  constructor(
    private builder: FormBuilder,
    private rest: RestService,
    public bsModalRef: BsModalRef,
    ) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      ci: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  submit() {
    const send = this.form.value
    send.password = '12345';
    send.role = 'user';
    this.rest.post('users', send).subscribe(() => {
      this.close()
    })
  }


  close = () => this.bsModalRef.hide()

  cb = () => {
    this.close()
  }

}
