import { Component, OnInit } from '@angular/core';
import {ListaOrdenService} from './lista-orden.service'

@Component({
  selector: 'app-lista-orden',
  templateUrl: './lista-orden.component.html',
  styleUrls: ['./lista-orden.component.css']
})
export class ListaOrdenComponent implements OnInit {

 public items = <any>[]
  constructor(
    
    public serviceLista: ListaOrdenService
    
    ) {
    this.items=[
      {
        ID: "1412334",
        name: "jofry caceres",
        type:"CPU",
        date: new Date(),
        status:"process",
        description:"description",
        divice: {
          D: "1412334",
          name: "Gregory Morantes",
          type:"CPU",
          date: new Date(),
          status:"process",
          description:"description",
        }
      },
      {
        ID: "22341324",
        name: "Arturo Luna",
        type:"impresora",
        date: new Date(),
        status:"wait",
        description:"description",
      },
      {
        ID: "312342134",
        name: "jesus moncada",
        type:"monitor",
        date: new Date(),
        status:"deliver",
        description:"description",
      },
      {
        ID: "4232342",
        name: "Carlos ll",
        type:"laptop",
        date: new Date(),
        status:"finalize",
        description:"description",
      },
      {
        ID: "32134",
        name: "Yisus craicy",
        type:"modem",
        date: new Date(),
        status:"finalize",
        description:"description",
      },
      {
        ID: "312342134",
        name: "jesus ccccccccccccccccccccccccccccccccccccccc",
        type:"router",
        date: new Date(),
        status:"deliver",
        description:"description",
      },
    ]
   }

  ngOnInit(): void {
  }

  openModal(data: any) { 
    this.serviceLista.openOrder(data)
  }

}
