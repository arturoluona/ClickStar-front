import { Component, OnInit } from '@angular/core';
import {ClienteServiceService} from './cliente-service.service'

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

    public items= <any>[]

  constructor(

    public serviceCliente: ClienteServiceService

  ) {

    this.items=[{
      

        ID:"1",
        nombre:"Jeffrey Caceres Benitez",
        nivel:"Admin",
        ci:"27232851",
        tlf1:"0424-7157450",
        tlf2:"0414-2137450",
        direccion:"Pasaje cumana con calle 10 cada G-50",
        correo:"Caceresjefreycab@gmail.com"
  
      },
      {
  
        ID:"2",
        nombre:"Arturo Luna",
        nivel:"Admin",
        ci:"27232851",
        tlf1:"0424-7157450",
        tlf2:"0414-2137450",
        direccion:"er cobre onde vendo mis conejos",
        correo:"ArturoLuna@gmail.com"
  
      },
      {
  
        ID:"3",
        nombre:"Gregory Morantes",
        nivel:"Oficina",
        ci:"27232851",
        tlf1:"0424-7157450",
        tlf2:"0414-2137450",
        direccion:"por la z no se muy bien como se llama por ahi en pirineos",
        correo:"Greg.mor@gmail.com"
  
      },
      {
  
        ID:"4",
        nombre:"Jose Miguel",
        nivel:"Tecnico",
        ci:"27232851",
        tlf1:"0424-7157450",
        tlf2:"0414-2137450",
        direccion:"en rubio qlk donde se inhundo el bta",
        correo:"PuntoyComa@gmail.com"
  
      }

        


    ]

   }

  ngOnInit(): void {
  }
  OpenModal(data: any){
    this.serviceCliente.openOrder(data)
  }
}
