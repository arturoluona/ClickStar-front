import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import {RestService} from '../rest.service';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-lista-orden',
  templateUrl: './lista-orden.component.html',
  styleUrls: ['./lista-orden.component.css']
})
export class ListaOrdenComponent implements OnInit {

  public items = <any>[];
  public search = '';
  public user: any;
  isDeleted = false;

  constructor(
    private cookieService: CookieService,
    private rest: RestService
    ) {}


  ngOnInit(): void {
    this.user =  JSON.parse(this.cookieService.get('user'));
    this.load(false)
  }

  load(a: any) {
    if (this.isDeleted) { this.deletedLoad(a); }
    else {
      this.items = []
      const query = (a) ? `filter=${a}&fields=idOrden` : ''
      this.rest.get(`orden?${query}`).subscribe(data => {
        console.log(data);
        data.docs.map(a => {
          this.items.push(a);
        })
      })
    }
  }

  public redireccion() {
    window.open(`${environment.api}/pdf/orden`, '_blank');
  }

  deletedLoad = (a = '') => {
    if (this.user.role === 'admin') {
      if (this.isDeleted) {
        const query = (a) ? `filter=${a}&fields=idOrden` : '';
        this.rest.get(`orden/deletedAll?${query}`).subscribe( (data: any) => {
          this.items = [];
          this.items = data;
        });
      } else {
        this.load('');
      }
    }
  }

  restored = (id) => {
    this.rest.get(`orden/restore/${id}`).subscribe(() => {
      this.deletedLoad('');
    });
  }
}
