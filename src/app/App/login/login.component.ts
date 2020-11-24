import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../rest.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service'
import {environment} from '../../../environments/environment';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading = <boolean>false;
  public form: FormGroup;

  constructor(
    private cookieService: CookieService,
    private builder: FormBuilder,
    private rest: RestService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      email: ['', Validators.compose([Validators.required, Validators.email,
        Validators.minLength(3),
        Validators.maxLength(254)])],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(18)]]
    });
  }

  login(): void {
    this.loading = true;
    this.form.disable();
    console.log(this.form.value)
    this.rest.post('login', this.form.value)
      .pipe(finalize(() => {
        this.loading = false;
        this.form.enable();
      })).subscribe((b) => {
        this.redirect(b);
      }, e => {
        Swal.fire(
          'Error',
          'Usuario o contraseña inválido',
          'error'
        );
      }
    );
  }

  redirect = (a) => {
    try {
      if (a.token) {
        this.cookieService.set('session', a.token, environment.daysTokenExpire, '/');
        this.cookieService.set('user', JSON.stringify(a.user), environment.daysTokenExpire, '/');
        this.router.navigate(['']);
      } else {
        this.rest.clearSession(true)
      }
    } catch (e) {
      this.rest.clearSession(true)
    }
  };

}
