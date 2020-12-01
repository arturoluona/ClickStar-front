import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public user: any;
  public audit = false;
  constructor(
    private cookieService: CookieService,
    private rest: RestService) { }

  ngOnInit(): void {
    this.user =  JSON.parse(this.cookieService.get('user'));
    console.log(this.user)
  }

  public logOut() {
    this.rest.clearSession(true)
  }

  public redirect(a) {
    window.open(`http://localhost:3000/pdf/${a}`, '_blank');
  }

}
