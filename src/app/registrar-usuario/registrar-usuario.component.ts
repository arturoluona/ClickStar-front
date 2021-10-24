import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  public form: FormGroup;

  public id: string;
  public item: any;

  constructor(
    private builder: FormBuilder,
    private rest: RestService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      ci: ['', Validators.required],
      password: [''],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    })

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    if(this.id) {
      this.load();
    }
  }

  submit(){
  const method = (this.id) ? 'patch' : 'post'
  const send = {
    name: this.form.value.name,
    email: this.form.value.email,
    ci: this.form.value.ci,
    password: this.form.value.password,
    role: this.form.value.role,
    phone: this.form.value.phone,
    city: this.form.value.city,
    country: this.form.value.country
  }
  if(method === 'patch') delete  send.password;

  this.rest[method](`users${(this.id) ? '/'+this.id : ''}`, send).subscribe((res) => {
      if(res.role === 'user') this.router.navigate(['/', 'lista-c'])
        else this.router.navigate(['/', 'modificar-u'])
    })
  }

  load() {
    this.rest.get(`users/${this.id}`).subscribe((res) => {
      this.item = res;
      this.form.patchValue(res);
    })
  }

}
