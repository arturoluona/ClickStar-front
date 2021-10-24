import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../rest.service';

@Component({
  selector: 'app-lista-orden',
  templateUrl: './lista-orden.component.html',
  styleUrls: ['./lista-orden.component.css']
})
export class ListaOrdenComponent implements OnInit {

  public items = <any>[];
  public search = '';
  constructor(
    private rest: RestService
    ) {}


  ngOnInit(): void {
    this.load(false)
  }

  load(a: any) {
    this.items = []
    const query = (a) ? `filter=${a}&fields=idOrden` : ''
    this.rest.get(`orden?${query}`).subscribe( data => {
      console.log(data);
      data.docs.map(a => {
        this.items.push(a);
      })
    })
  }

  public redireccion() {
    window.open(`http://localhost:3000/pdf/orden`, '_blank');
  }
}
