import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import {ClienteServiceService} from './cliente-service.service'

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  public items= <any>[];
  public search = '';
  constructor(
    private serviceCliente: ClienteServiceService,
    private rest: RestService    
    ) {}
    

  ngOnInit(): void {
    this.load(false)
  }
  
  load(a: any) {
    const query = (a) ? `filter=${a}&fields=ci,name,email,phone` : '';
    this.rest.get(`users/customers?${query}`).subscribe( data => {      
      this.items = [];
      data.docs.map(a => {
        this.items.push(a);
      })
    })
  }

  OpenModal(data: any){
    this.serviceCliente.openOrder(data)
  }
}
